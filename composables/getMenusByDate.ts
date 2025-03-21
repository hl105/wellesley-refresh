import {
  ALLERGENS,
  ALLERGEN_FIELDS,
  PREFERENCES,
  PREFERENCE_FIELDS,
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

function prettifyData(data: Tables<"Menu">[]) {
  let prettified: PrettifiedData = {};

  console.log("inside function top");
  data.forEach((dish) => {
    const date = dish["date"];
    if (!(date in prettified)) {
      prettified[date] = {};
    }
    let meals = prettified[date];

    const meal = dish["meal"];
    if (!(meal in meals)) {
      meals[meal] = {};
    }
    let food = meals[meal];

    const dhall = dish["dhall"];
    if (!(dhall in food)) {
      food['Bates'] = {};
      food['Stone D'] = {};
      food['Lulu'] = {};
      food['Tower'] = {};
    }
    let stations = food[dhall];

    const station = dish["station"];
    if (!(station in stations)) {
      stations[station] = {};
      stations["order"] = dish["stationOrder"];
    }
    let thisStation = stations[station];

    thisStation[dish["name"]] = {
      // allergens: getAllergensInfo(dish['allergens']),
      // preferences: getPreferencesInfo(dish['preferences']),
      description: dish["description"],
    };
  });

  console.log("inside function");
  return prettified;
}

/**
 * Filter out past meals based on the current time
 * @param meals Prettified data to filter
 * @param now Current date and time
 * @returns Filtered prettified data
 */
function filterPastMeals(menus: PrettifiedData, now: Date): PrettifiedData {
  const filteredData: PrettifiedData = { ...menus}; // shallow copy bc we only modify the current date

  const todayStr = now.toISOString().split("T")[0];

  if (filteredData[todayStr]) {
    const todayMeals = { ...filteredData[todayStr] }; // grab meals object for today
    const currentHour = now.getHours();
    console.log("currentHour", currentHour);

    if (currentHour >= 19) {
      delete filteredData[todayStr]; // drop entire day because it's past 7pm
    } else if (currentHour >= 14) {
      delete todayMeals["breakfast"];
      filteredData[todayStr] = todayMeals;
    }
  }

  return filteredData;
}

/**
 *
 * @param date Date to query five day's worth of menus from
 * @returns formatted menus with past meals filtered out
 */
export function getMenusByDate(date: Date) {
  const client = useSupabaseClient();
  const key = `menu-${date}`;
  const fiveDaysFromDate = new Date(date);
  fiveDaysFromDate.setDate(date.getDate() + 5);

  return useAsyncData(key, async () => {
    const { data, error } = await client
      .from("Menu")
      .select("*")
      .gte("date", date.toISOString().split("T")[0])
      .lte("date", fiveDaysFromDate.toISOString().split("T")[0]);

    if (error) {
      console.log("Error while fetching dining hall menu", error);
    }
    const menus =  prettifyData(data as Tables<"Menu">[]);
    return filterPastMeals(menus, date);
  });
}
