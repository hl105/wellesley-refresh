const ALLERGENS = {
  "has_dairy": {
      "id": 8,
      "name": "Dairy",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1616704537/Filter/d8db7f73-11b6-42d0-bb54-84421df28ccdMilk.png",
  },
  "has_egg": {
      "id": 9,
      "name": "Egg",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1616704545/Filter/804d1cea-2ea6-4402-86ad-94de8ee3b794Eggs.png",
  },
  "has_fish": {
      "id": 55,
      "name": "Fish",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1572036202/Filter/9c81d044-bb17-43f4-bae8-12f695370291Fish.png",
  },
  "has_peanut": {
      "id": 7,
      "name": "Peanut",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1616704556/Filter/ad113f9c-4e43-44f3-8457-b75cec40fb91Peanuts.png",
  },
  "has_sesame": {
      "id": 56,
      "name": "Sesame",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1660659591/Filter/1c8163a0-d2a0-483d-a5bd-ba1e8505de0eSesame.png",
  },
  "has_soy": {
      "id": 6,
      "name": "Soy",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1572036355/Filter/940249d6-35b4-45a4-b636-2c2e7eec794cSoy.png",
  },
  "has_tree_nut": {
      "id": 5,
      "name": "Tree Nut",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1572036400/Filter/7a1abc99-77a2-4e35-bea8-ae6e92deae29TreeNut.png",
  },
  "has_wheat": {
      "id": 4,
      "name": "Wheat",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1616704567/Filter/1da8b875-817f-44e3-bf19-1ba1782d5162Wheat.png",
  },
  "has_shellfish": {
      "id": 3,
      "name": "Shellfish",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1572036362/Filter/9022fb0c-eb15-43f5-b636-9735b184f3e4Shellfish.png",
  },
  "may_contain_dairy": {
      "id": 87,
      "name": "May Contain Dairy",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992189/Filter/8125355b-75a4-439a-a202-438491c8c148Milk.png",
  },
  "may_contain_egg": {
      "id": 88,
      "name": "May Contain Egg",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992206/Filter/0c5bc4da-eabf-474d-9bf7-8c9f0791c7d6Eggs.png",
  },
  "may_contain_peanut": {
      "id": 94,
      "name": "May Contain Peanut",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992221/Filter/cdd74d0b-12b1-48f3-9e96-22761d30c289Peanuts.png",
  },
  "may_contain_sesame": {
      "id": 89,
      "name": "May Contain Sesame",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992237/Filter/01d8b10a-6460-424b-9912-d93c1e2dcc70Sesame.png",
  },
  "may_contain_soy": {
      "id": 92,
      "name": "May Contain Soy",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992261/Filter/bd40abe1-2732-40ea-9469-e6bd119c16c5Soy.png",
  },
  "may_contain_tree_nut": {
      "id": 90,
      "name": "May Contain Tree Nut",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992275/Filter/482ea18c-e2cb-4d7a-96fe-15b055873114TreeNut.png",
  },
  "may_contain_wheat": {
      "id": 93,
      "name": "May Contain Wheat",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1662992288/Filter/a0c44739-1e63-4229-aa4f-fed757a64b98Wheat.png",
  },
}
const PREFERENCES = {
  "is_gluten_sensitive": {
      "id": 50,
      "name": "Gluten Sensitive",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1572036836/Filter/ffefde3e-f3f0-4fcb-8b5d-91388926f8c6GlutenSensitive.png",
  },
  "is_vegan": {
      "id": 47,
      "name": "Vegan",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1572036889/Filter/ef7edf53-362e-4916-8bf2-33c76ab41d42Vegan.png",
  },
  "is_vegetarian": {
      "id": 46,
      "name": "Vegetarian",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1660659657/Filter/985e4792-daab-40b5-8df7-fe75190907b4Vegetarian.png",
  },
  "is_nutrigood": {
      "id": 52,
      "name": "NutriGOOD",
      "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1705603890/Filter/380a3dec-c912-45f6-9fa3-38c767bb95e0nutriGOOD_icon_for_dish.png",
  },
}
const ALLERGEN_FIELDS = [
  "has_dairy",
  "has_egg",
  "has_fish",
  "has_peanut",
  "has_sesame",
  "has_soy",
  "has_tree_nut",
  "has_wheat",
  "has_shellfish",
  "may_contain_dairy",
  "may_contain_egg",
  "may_contain_peanut",
  "may_contain_sesame",
  "may_contain_soy",
  "may_contain_tree_nut",
  "may_contain_wheat",
]
const PREFERENCE_FIELDS = [
  "is_vegetarian",
  "is_vegan",
  "is_gluten_sensitive",
  "is_nutrigood",
]

function getAllergensInfo(dish) {
  let allergensInfo = [];

  ALLERGEN_FIELDS.forEach(allergenField => {
    if (dish[allergenField]) {
      allergensInfo.push(ALLERGENS[allergenField]);
    }
  });

  return allergensInfo;
}

function getPreferencesInfo(dish) {
  let preferencesInfo = [];

  PREFERENCE_FIELDS.forEach(preferenceField => {
    if (dish[preferenceField]) {
      preferencesInfo.push(PREFERENCES[preferenceField]);
    }
  });

  return preferencesInfo;
}

function sortByStations(dishes) {
  let stations = {};
  for (const dish of dishes) {
    const stationOrder = dish['stationOrder'];
    if (!(stationOrder in stations)) {
      stations[stationOrder] = {};
      stations['name'] = dish['station'];
    }
    let thisStation = stations[stationOrder];

    thisStation[dish['name']] = {
      allergens: getAllergensInfo(dish['allergens']),
      preferences: getPreferencesInfo(dish['preferences']),
      description: dish['description'],
    };
  };

  let stationsSorted = [];
  const stationOrders = Object.keys(stations).sort();
  for (const stationOrder of stationOrders) {
    stationsSorted.push(stations[stationOrder]);
  }

  return stationsSorted;
}

export function getMenuByDateLocMeal(date: string, dhall: string, meal: string) {
  const client = useSupabaseClient();
  const key = `menu-${date}-${dhall}-${meal}`;

  /*
  Async Func returns query's data, and useAsyncData wraps it in a **reactive obj** with error, pending , refresh
  and returns it.
  */
  return useAsyncData(key, async () => {
    const { data, error } = await client
      .from("Menu")
      .select("*")
      .eq("date", date)
      .eq("dhall", dhall)
      .eq("meal", meal);
    if (error) {
      console.log("Error while fetching dining hall menu", error);
    }

    return prettifyData(data);
  });
}
