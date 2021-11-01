export function useRouterUtils() {
  function convertQueryToArray(query: any) {
    try {
      return String(query).split(",");
    } catch {
      return [];
    }
  }

  function convertQueryToNumberArray(query: any) {
    try {
      return convertQueryToArray(query).map((item) => Number(item));
    } catch {
      return [];
    }
  }

  function normalizeRouteParam(routeParam?: string | null) {
    try {
      return routeParam?.replaceAll(" ", "_").toLocaleLowerCase() || "";
    } catch {
      return "";
    }
  }

  return { convertQueryToArray, convertQueryToNumberArray, normalizeRouteParam };
}
