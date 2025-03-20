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
    return data;
  });
}
