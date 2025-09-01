import {
  ALLERGENS,
  ALLERGEN_FIELDS,
  PREFERENCES,
  PREFERENCE_FIELDS,
  NUTRITIONALS,
} from "@/constants";
import type { Allergen, Preference, PrettifiedData } from "@/types";
import type { Tables } from "@/database.types";

function getAllergensInfo(dish) {
  let allergensInfo: Allergen[] = [];

  ALLERGEN_FIELDS.forEach((allergenField) => {
    if (dish[allergenField]) {
      allergensInfo.push(ALLERGENS[allergenField]);
    }
  });

  return allergensInfo;
}

function getPreferencesInfo(dish) {
  let preferencesInfo: Preference[] = [];

  PREFERENCE_FIELDS.forEach((preferenceField) => {
    if (dish[preferenceField]) {
      preferencesInfo.push(PREFERENCES[preferenceField]);
    }
  });

  return preferencesInfo;
}

function getNutritionalInfo(dish) {
  var nutritionalInfo = {};
  NUTRITIONALS.forEach((nutritional) => {
    nutritionalInfo[nutritional] = dish[nutritional];
  });
  return nutritionalInfo;
}

function prettifyData(data: Tables<"Menu">[]) {
  let prettified: PrettifiedData = {};

  // console.log("inside function top");
  data.forEach((dish) => {
    const date = dish["date"];
    const dayOfWeek = new Date(date).getUTCDay();
    if (!(date in prettified)) {
      prettified[date] = {};
      prettified[date]["dinner"] = {};
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        prettified[date]["brunch"] = {};
      } else {
        prettified[date]["breakfast"] = {};
        prettified[date]["lunch"] = {};
      }
    }
    let meals = prettified[date];

    const meal =
      dish["meal"] !== "dinner" && (dayOfWeek === 0 || dayOfWeek === 6)
        ? "brunch"
        : dish["meal"];
    let food = meals[meal];

    const dhall = dish["dhall"];
    if (!(dhall in food)) {
      food["Bates"] = {};
      food["Stone D"] = {};
      food["Lulu"] = {};
      food["Tower"] = {};
    }
    let stations = food[dhall];

    const station = dish["station"];
    if (!(station in stations)) {
      stations[station] = {};
      stations["order"] = dish["stationOrder"];
    }
    let thisStation = stations[station];
    // console.log(dish)
    thisStation[dish["name"]] = {
      allergens: getAllergensInfo(dish),
      preferences: getPreferencesInfo(dish),
      nutritionals: getNutritionalInfo(dish),
      description: dish["description"],
    };
  });

  // console.log("inside function");
  return prettified;
}

/**
 * Filter out past meals based on the current time
 * @param meals Prettified data to filter
 * @param now Current date and time in EST
 * @returns Filtered prettified data
 */
function filterPastMeals(menus: PrettifiedData): PrettifiedData {
  const filteredData: PrettifiedData = { ...menus }; // shallow copy bc we only modify the current date
  const today = getToday();
  const currentHour = getCurrentHour();
  const date: Date = new Date(today);
  if (filteredData[today]) {
    const todayMeals = { ...filteredData[today] }; // grab meals object for today
    const isWeekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;

    if (currentHour >= 22) {
      delete filteredData[today]; // drop entire day (breakfast, lunch, dinner) because it's past 10pm EST
    } else {
      if (isWeekend) {
        if (currentHour >= 14) {
          // console.log("dropping breakfast, lunch, brunch for", today);
          delete todayMeals["breakfast"];
          delete todayMeals["lunch"];
          delete todayMeals["brunch"];
          filteredData[today] = todayMeals;
        }
      } else {
        // weekday
        if (currentHour >= 10 && currentHour < 14) {
          // console.log("dropping breakfast for", today);
          delete todayMeals["breakfast"];
          delete todayMeals["brunch"];
          filteredData[today] = todayMeals;
        } else if (currentHour >= 14) {
          // console.log("dropping breakfast and lunch if after 2 for", today)
          delete todayMeals["breakfast"];
          delete todayMeals["lunch"];
          delete todayMeals["brunch"];
          filteredData[today] = todayMeals;
        }
      }
    }
  }
  return filteredData;
}

/**
 *
 * @param date Date to query five day's worth of menus from
 * @returns formatted menus with past meals filtered out
 */
export function getMenusByDate(date: Moment) {
  const client = useSupabaseClient();
  const dateStr = date.format("YYYY-MM-DD");
  const key = `menu-${dateStr}`;
  const endDate = date.clone().add(5, "days");

  return useAsyncData(key, async () => {
    let allData: Tables<"Menu">[] = [];

    // Get the number of items that fit this filter
    const { count, error: countError } = await client
      .from("Menu")
      .select("*", { count: "exact", head: true })
      .gte("date", dateStr)
      .lte("date", endDate.format("YYYY-MM-DD"));

    if (countError) {
      console.log("Error while counting dining hall menus", countError);
      return [];
    }

    const total = count ?? 0;

    // Fetch 1000 at a time since that is the default supabase limit
    const pageSize = 1000;
    for (let from = 0; from < total; from += pageSize) {
      const to = from + pageSize - 1;

      const { data, error } = await client
        .from("Menu")
        .select("*")
        .gte("date", dateStr)
        .lte("date", endDate.format("YYYY-MM-DD"))
        .range(from, to);

      if (error) {
        console.log("Error while fetching dining hall menus", error);
        break;
      }

      allData = allData.concat(data as Tables<"Menu">[]);
    }

    const menus = prettifyData(allData);
    return filterPastMeals(menus);
  });
}
