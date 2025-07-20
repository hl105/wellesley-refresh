import json
import os
from datetime import date, timedelta
from enum import IntEnum, StrEnum

import requests
from dotenv import load_dotenv

load_dotenv(".env")

SUPABASE_URL = os.environ.get("NUXT_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("NUXT_SUPABASE_KEY")

with open("scrape/allergens_and_preferences.json") as f:
    d = json.load(f)
    ALLERGENS = d["allergens"]
    PREFERENCES = d["preferences"]
    ALLERGEN_FIELDS = d["allergen_fields"]
    PREFERENCE_FIELDS = d["preference_fields"]


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
            case Bates.BREAKFAST | StoneDavis.BREAKFAST | Lulu.BREAKFAST | Tower.BREAKFAST:
                return cls.BREAKFAST
            case Bates.LUNCH | StoneDavis.LUNCH | Lulu.LUNCH | Tower.LUNCH:
                return cls.LUNCH
            case Bates.DINNER | StoneDavis.DINNER | Lulu.DINNER | Tower.DINNER:
                return cls.DINNER


def set_bools(payload: dict, fields_dict: dict[str, str], l: list[dict[str, str]]) -> None:
    """
    Uses the allergens/preferences contained in list to populate booleans in the
    payload.

    Args:
        payload (dict): the payload to Supabase
        fields_dict (dict): the dictionary mapping allergen/preference ids to names
        l (dict): the list of allergens/preferences
    """
    for property in l:
        id = str(property["id"])  # JSON requires the field names be strings
        try:
            payload[fields_dict[id]] = True
        except KeyError:
            print(f"\n\nno id for this property found: {id}\n\nfields: {fields_dict}\n\n")


def get_menu(locationId: int | DiningHall, mealId: int | Meal, date: date = date.today()):
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


def push_data(dhall: int | DiningHall, meal: int | Meal, wfapi_menu: dict):
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
        nutritionals = dish["nutritionals"]
        payload = {
            # boilerplate
            "supabaseUrl": SUPABASE_URL,
            "supabaseKey": SUPABASE_KEY,
            # basic dish details
            "date": dish["date"][:10],
            "dhall": dhall,
            "meal": meal,
            "name": dish["name"],
            "description": dish["description"],
            # station details
            "station": dish["stationName"].title(),
            "stationOrder": dish["stationOrder"],
            # serving size
            "serving_size": float(nutritionals["servingSize"]),
            "serving_size_unit": nutritionals["servingSizeUOM"],
            # nutritionals
            "calories": int(nutritionals["calories"]),
            "fat": int(nutritionals["fat"]),  # g
            "calories_from_fat": int(nutritionals["caloriesFromFat"]),  # not in Wellesley Fresh
            "saturated_fat": int(nutritionals["saturatedFat"]),  # g
            "trans_fat": int(nutritionals["transFat"]),  # g
            "cholesterol": int(nutritionals["cholesterol"]),  # mg
            "sodium": int(nutritionals["sodium"]),  # mg
            "carbohydrates": int(nutritionals["carbohydrates"]),  # g
            "dietary_fiber": int(nutritionals["dietaryFiber"]),  # g
            "sugars": int(nutritionals["sugars"]),  # g
            "added_sugar": int(nutritionals["addedSugar"]),  # g
            "protein": int(nutritionals["protein"]),  # g
        }

        # add booleans for which allergens & preferences apply
        set_bools(payload, ALLERGEN_FIELDS, dish["allergens"])
        set_bools(payload, PREFERENCE_FIELDS, dish["preferences"])

        response = requests.post(url, json=payload, verify=False)
        print(response.json())


def delete_data():
    url = "https://wellesley-refresh.vercel.app/api/delete"
    payload = {
        "supabaseUrl": SUPABASE_URL,
        "supabaseKey": SUPABASE_KEY,
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
                menu = get_menu(dhall.ID, meal, day)
                push_data(dhall.ID, meal, menu)


if __name__ == "__main__":
    main()
