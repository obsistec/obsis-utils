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

export function isEditFormByRouteName(routeName: RouteRecordName | null | undefined) {
  try {
    return routeName?.toString().includes("-edit");
  } catch {
    return false;
  }
}

export function compareDates(date1: string, date2?: string) {
  if (!date2) date2 = new Date().toISOString();

  const date1Ob = new Date(date1.includes("T") ? date1 : date1.replaceAll("-", "/"));
  const date2Ob = new Date(date2.includes("T") ? date2 : date2.replaceAll("-", "/"));

  return date1Ob >= date2Ob;
}
