import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export type PaginationEvent = {
  page: number;
  first: number;
  rows: 8 | 12 | 16 | 24 | 32;
  pageCount: number;
};

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

export default usePagination;
