import { RouteRecordName } from "vue-router";

export function isCPF(value: string | number | undefined | null): boolean {
  try {
    return value?.toString().replace(/[^0-9]/g, "").length === 11;
  } catch {
    return false;
  }
}

export function isCNPJ(value: string | number | undefined | null): boolean {
  try {
    return value?.toString().replace(/[^0-9]/g, "").length === 14;
  } catch {
    return false;
  }
}

export function isEditFormByRouteName(
  routeName: RouteRecordName | null | undefined
) {
  try {
    return routeName?.toString().includes("-edit");
  } catch {
    return false;
  }
}
