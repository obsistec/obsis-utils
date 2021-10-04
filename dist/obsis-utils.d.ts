import { RouteRecordName } from 'vue-router';
import * as vue from 'vue';

declare const genderOptions: {
    label: string;
    value: string;
}[];
declare const sexOptions: {
    label: string;
    value: string;
}[];
declare const agendaTypeOptions: {
    label: string;
    value: string;
}[];
declare function getAgendaTypeOptions(value: string): {};
declare const dayOfWeek: {
    value: string;
    label: string;
}[];
declare const conselhos: {
    label: string;
    value: string;
}[];
declare const guideStatus: {
    label: string;
    value: number;
}[];
declare const agendaCalendarTypes: {
    label: string;
    value: string;
    color: string;
}[];
declare function getAgendaCalendarTypes(value: any): {
    label: string;
    value: string;
    color: string;
} | undefined;
declare const agendamentoStatus: {
    value: string;
    label: string;
    color: string;
}[];
declare function getAgendamentoStatus(value: string): {
    value: string;
    label: string;
    color: string;
};

declare function isCPF(value: string | number | undefined | null): boolean;
declare function isCNPJ(value: string | number | undefined | null): boolean;
declare function isEditFormByRouteName(routeName: RouteRecordName | null | undefined): boolean | undefined;

declare function addUTC(date?: string): string;
declare function formatDate(date?: string): string;
declare function addDateMask(date?: string): string;
declare function removeDateMask(date?: string): string;
declare function addDateMMAAAAMask(date?: string): string;
declare function removeDateMMAAAAMask(date?: string): string;
declare function formatDateMMAAAA(date?: string): string;
declare function addHoursMask(hours: string): string;
declare function formatHours(hours?: string): string;
declare function formatDateTime(date?: string, hour?: string): string;
declare function formatDateEn(date: any): string;
declare function formatDateTimeEn(date: any, hour: string): string;
declare function formatDateLong(date?: string): string;
declare function formatFullDateLong(date?: string): string;
declare function formatNumericDateLong(date?: string): string;
declare function formatDateTimeLong(date?: string, hour?: string): string;
declare function getHourInDate(date?: string): string;

declare function formatMoneyNumberToString(value?: number | string): string;
declare function formatPhone(phone?: string): string;
declare function removePhoneMask(phone?: string): string;
declare function formatFileName(aq_arquivo?: string): string;
declare function addMoneyMask(value?: number): string;
declare function removeMoneyMask(value?: string): string;
declare function removeMoneyMaskAndConvert(value?: string): number;
declare function formatCPF(value?: string): string;
declare function removeCPFMask(value: string): string;
declare function formatCPFToLGPD(value?: string): string | undefined;
declare function removeCNPJMask(value: string): string;
declare function formatLocality(ob_cidade?: any): string;
declare function formatLocalityLong(ob_cidade?: any): string;
declare function formatZipCode(zipCode: string): string;
declare function removeFormatZipCode(zipCode: string): string;
declare function formatGender(value?: "M" | "F" | null): "Masculino" | "Feminino" | "Outro";
declare function formatCreditCard(value?: string): string;

declare function detectCardType(number: string): string | undefined;
declare function compareDates(date: string): boolean;
declare function getUserName(firstName?: string, lastName?: string, full?: boolean): string;
declare function splitUserName(userName: string): string[];

declare const localeConfig: {
    firstDayOfWeek: number;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today: string;
    clear: string;
    dateFormat: string;
    weekHeader: string;
    startsWith: string;
    contains: string;
    notContains: string;
    endsWith: string;
    equals: string;
    notEquals: string;
    noFilter: string;
    lt: string;
    lte: string;
    gt: string;
    gte: string;
    dateIs: string;
    dateIsNot: string;
    dateBefore: string;
    dateAfter: string;
    apply: string;
    matchAll: string;
    matchAny: string;
    addRule: string;
    removeRule: string;
    accept: string;
    reject: string;
    choose: string;
    upload: string;
    cancel: string;
    weak: string;
    medium: string;
    strong: string;
    passwordPrompt: string;
    emptyFilterMessage: string;
    emptyMessage: string;
};

declare function useDownloadFile(createElement: any, createObjectURL: any, Blob: any): {
    downloadPDF: ({ content }: {
        content: any;
    }) => void;
    downloadCSV: ({ content }: {
        content: any;
    }) => void;
};

declare function useFilter({ ignore }?: {
    ignore: string[];
}): {
    hasFilters: vue.ComputedRef<number>;
    hasAnyFilters: vue.ComputedRef<number>;
    hasSpecificFilter: (items: string[]) => boolean;
};

declare type PaginationEvent = {
    page: number;
    first: number;
    rows: 8 | 12 | 16 | 24 | 32;
    pageCount: number;
};
declare function usePagination(params: {
    module: string | any;
    setPage: string | any;
    field?: string;
    updateList: () => any;
}): {
    pagination: vue.ComputedRef<any>;
    handleUpdateCurrentPage: (event: PaginationEvent) => void;
};

export { PaginationEvent, addDateMMAAAAMask, addDateMask, addHoursMask, addMoneyMask, addUTC, agendaCalendarTypes, agendaTypeOptions, agendamentoStatus, compareDates, conselhos, dayOfWeek, detectCardType, formatCPF, formatCPFToLGPD, formatCreditCard, formatDate, formatDateEn, formatDateLong, formatDateMMAAAA, formatDateTime, formatDateTimeEn, formatDateTimeLong, formatFileName, formatFullDateLong, formatGender, formatHours, formatLocality, formatLocalityLong, formatMoneyNumberToString, formatNumericDateLong, formatPhone, formatZipCode, genderOptions, getAgendaCalendarTypes, getAgendaTypeOptions, getAgendamentoStatus, getHourInDate, getUserName, guideStatus, isCNPJ, isCPF, isEditFormByRouteName, localeConfig, removeCNPJMask, removeCPFMask, removeDateMMAAAAMask, removeDateMask, removeFormatZipCode, removeMoneyMask, removeMoneyMaskAndConvert, removePhoneMask, sexOptions, splitUserName, useDownloadFile, useFilter, usePagination };
