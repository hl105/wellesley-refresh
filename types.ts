export type AllergenKey =
  | "has_dairy"
  | "has_egg"
  | "has_fish"
  | "has_peanut"
  | "has_sesame"
  | "has_soy"
  | "has_tree_nut"
  | "has_wheat"
  | "has_shellfish"
  | "may_contain_dairy"
  | "may_contain_egg"
  | "may_contain_peanut"
  | "may_contain_sesame"
  | "may_contain_soy"
  | "may_contain_tree_nut"
  | "may_contain_wheat";

export interface Allergen {
  id: number;
  name: string;
  img: string;
}

export type PreferenceKey =
  | "is_vegetarian"
  | "is_vegan"
  | "is_gluten_sensitive"
  | "is_nutrigood";

export interface Preference {
  id: number;
  name: string;
  img: string;
}

export interface PrettifiedData {
    [date: string]: {
      [meal: string]: {
        [dhall: string]: {
          [station: string]: {
            [dishName: string]: {
              description: string | null;
            };
          } & { order: number | null };
        };
      };
    };
  }