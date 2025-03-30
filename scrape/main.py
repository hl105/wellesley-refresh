import os
from datetime import date, timedelta
from enum import IntEnum, StrEnum

import requests
from dotenv import load_dotenv

load_dotenv("../.env")

ALLERGENS = {
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
    "may_contain_fish": {
        "id": 97,
        "name": "May Contain Fish",
        "img": "https://res.cloudinary.com/avi-foodsystems/image/upload/v1732114141/Filter/7874f89d-3ddd-4022-ac42-2ceeb462aa13Fish.png",
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
    "may_contain_shellfish": {},
}
PREFERENCES = {
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
ALLERGEN_FIELDS = {
    8: "has_dairy",
    9: "has_egg",
    55: "has_fish",
    7: "has_peanut",
    56: "has_sesame",
    6: "has_soy",
    5: "has_tree_nut",
    4: "has_wheat",
    3: "has_shellfish",
    87: "may_contain_dairy",
    88: "may_contain_egg",
    94: "may_contain_peanut",
    89: "may_contain_sesame",
    92: "may_contain_soy",
    90: "may_contain_tree_nut",
    93: "may_contain_wheat",
}
PREFERENCE_FIELDS = {
    46: "is_vegetarian",
    47: "is_vegan",
    50: "is_gluten_sensitive",
    52: "is_nutrigood",
}


class WellesleyFreshException(Exception):
    """
    For exceptions related to Wellesley Fresh's site.
    """

    def __init__(self, *args):
        super().__init__(*args)


class Bates(IntEnum):
    ID = 95
    BREAKFAST = 145
    LUNCH = 146
    DINNER = 311


class StoneDavis(IntEnum):
    ID = 131
    BREAKFAST = 261
    LUNCH = 262
    DINNER = 263


class Lulu(IntEnum):
    ID = 96
    BREAKFAST = 148
    LUNCH = 149
    DINNER = 312


class Tower(IntEnum):
    ID = 97
    BREAKFAST = 153
    LUNCH = 154
    DINNER = 310


DINING_HALLS = (Bates, StoneDavis, Lulu, Tower)


class DiningHall(StrEnum):
    """
    Class to obtain the name of a dining hall from its ID.

    Usage:
    DiningHall(Bates.ID) -> 'Bates'
    """

    BATES = "Bates"
    STONEDAVIS = "Stone D"
    LULU = "Lulu"
    TOWER = "Tower"

    @classmethod
    def _missing_(cls, val: int) -> str:
        match val:
            case Bates.ID:
                return cls.BATES
            case StoneDavis.ID:
                return cls.STONEDAVIS
            case Lulu.ID:
                return cls.LULU
            case Tower.ID:
                return cls.TOWER


class Meal(StrEnum):
    """
    Class to obtain the name of a meal from its ID.

    Usage:
    Meal(Bates.BREAKFAST) -> 'breakfast'
    """

    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"

    @classmethod
    def _missing_(cls, val: int):
        match val:
            case (
                Bates.BREAKFAST
                | StoneDavis.BREAKFAST
                | Lulu.BREAKFAST
                | Tower.BREAKFAST
            ):
                return cls.BREAKFAST
            case Bates.LUNCH | StoneDavis.LUNCH | Lulu.LUNCH | Tower.LUNCH:
                return cls.LUNCH
            case Bates.DINNER | StoneDavis.DINNER | Lulu.DINNER | Tower.DINNER:
                return cls.DINNER


def get_menu(locationId: int, mealId: int, date: date = date.today()):
    """
    Gets the menu for a dhall and a meal for the week at the given date.

    Args:
        locationId (int): locationId as specified by Wellesley Fresh API.
        mealId (int): mealId as specified by Wellesley Fresh API.
        date (date, optional): week to get data for. Defaults to date.today().

    Raises:
        Exception: when web response is not ok
    """
    response = requests.get(
        "https://dish.avifoodsystems.com/api/menu-items/week",
        params={
            "date": date.strftime(
                "%-m/%-d/%y"  # the - makes the date not 0-padded
            ),
            "locationId": locationId,
            "mealId": mealId,
        },
        verify=False,
    )

    if response.ok:
        return response.json()
    else:
        raise WellesleyFreshException(  # could create a better exception class
            f"Got web response {response.status_code}!"
        )


def push_data(dhall: int, meal: int, wfapi_menu: dict):
    """
    Processes and pushes data from a menu gathered from the Wellesley Fresh
    API, as done by get_menu.

    Args:
        wfapi_menu (dict): Menu for the week
    """
    dhall = DiningHall(dhall)
    meal = Meal(meal)

    url = "https://wellesley-refresh.vercel.app/api/push"
    for dish in wfapi_menu:
        payload = {
            "supabaseUrl": os.environ.get("NUXT_SUPABASE_URL"),
            "supabaseKey": os.environ.get("NUXT_SUPABASE_KEY"),
            "date": dish["date"][:10],
            "dhall": dhall,
            "meal": meal,
            "name": dish["name"],
            "description": dish["description"],
            "station": dish["stationName"].title(),
            "stationOrder": dish["stationOrder"],
        }

        # add booleans for which allergens & preferences apply
        for allergen in dish["allergens"]:
            try:
                payload[ALLERGEN_FIELDS[allergen["id"]]] = True
            except:
                print(f"\n\nno allergen id, {allergen['id']}\n\n")
        for preference in dish["preferences"]:
            payload[PREFERENCE_FIELDS[preference["id"]]] = True

        response = requests.post(url, json=payload, verify=False)
        print(response.json())


def delete_data():
    url = "https://wellesley-refresh.vercel.app/api/delete"
    payload = {
        "supabaseUrl": os.environ.get("NUXT_SUPABASE_URL"),
        "supabaseKey": os.environ.get("NUXT_SUPABASE_KEY"),
    }

    response = requests.post(url, json=payload, verify=False)
    print(response.json())


def main() -> None:
    delete_data()
    for dhall in DINING_HALLS:
        for meal in (dhall.BREAKFAST, dhall.LUNCH, dhall.DINNER):
            for day in (
                date.today(),
                date.today() + timedelta(days=7),
            ):  # get tomorrow too
                menu = get_menu(dhall, meal, day)
                push_data(dhall.ID, meal, menu)


if __name__ == "__main__":
    main()
