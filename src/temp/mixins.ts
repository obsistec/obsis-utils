import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { PaginationEvent } from "@/store/types";
import { formatDateTimeEn } from "./formatters";

export function usePagination(params: {
  module: string | any;
  setPage: string | any;
  field?: string;
  updateList: () => any;
}) {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const [module, secondaryModule] = params.module.split(".");

  const pagination = computed(
    // @ts-expect-error temp
    // eslint-disable-line no-use-before-define
    () => (secondaryModule ? store.state[module][secondaryModule] : store.state[module])[params.field || "pagination"]
  );

  function handleUpdateCurrentPage(event: PaginationEvent) {
    const page = event.page + 1;

    router.replace({ query: { ...route.query, pg: page } });
    store.commit(params.setPage, { page });

    params.updateList();
  }

  store.commit(params.setPage, { page: 1 });
  router.replace({ query: { ...route.query, pg: 1 } });

  return { pagination, handleUpdateCurrentPage };
}

export function useFilters({ ignore }: { ignore: string[] } = { ignore: [] }) {
  const route = useRoute();
  ignore?.push("pg");

  const hasFilters = computed(() => Object.keys(route.query).filter((item) => !ignore.includes(item)).length);
  const hasAnyFilters = computed(() => Object.keys(route.query).filter((item) => !["pg"].includes(item)).length);
  const hasSpecificFilter = (items: string[]) =>
    Boolean(Object.keys(route.query).find((query) => items.includes(query)));

  return { hasFilters, hasAnyFilters, hasSpecificFilter };
}

export function useDownloadFile() {
  function downloadPDF({ content }: { content: any }) {
    const linkEl = document.createElement("a");
    linkEl.href = URL.createObjectURL(new Blob([content], { type: "application/pdf" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.pdf`);
    linkEl.click();
  }

  function downloadCSV({ content }: { content: any }) {
    const linkEl = document.createElement("a");
    linkEl.href = URL.createObjectURL(new Blob([content], { type: "application/csv" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.csv`);
    linkEl.click();
  }

  return { downloadPDF, downloadCSV };
}
