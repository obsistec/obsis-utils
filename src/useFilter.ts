import { computed } from "vue";
import { useRoute } from "vue-router";

export function useFilter({ ignore }: { ignore: string[] } = { ignore: [] }) {
  const route = useRoute();
  ignore?.push("pg");

  const hasFilters = computed(() => Object.keys(route.query).filter((item) => !ignore.includes(item)).length);
  const hasAnyFilters = computed(() => Object.keys(route.query).filter((item) => !["pg"].includes(item)).length);
  const hasSpecificFilter = (items: string[]) =>
    Boolean(Object.keys(route.query).find((query) => items.includes(query)));

  return { hasFilters, hasAnyFilters, hasSpecificFilter };
}

export const sexFilterOptions = [
  { label: "Todos", value: null },
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
];
