import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const genderOptions = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
  { label: "N\xE3o aplic\xE1vel", value: "N" }
];
const sexOptions = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" }
];
const agendaTypeOptions = [
  { label: "Consulta", value: "C" },
  { label: "Exame", value: "E" },
  { label: "Laborat\xF3rio", value: "L" },
  { label: "Procedimento", value: "P" }
];
function getAgendaTypeOptions(value) {
  return agendaTypeOptions.find((item) => item.value === value) || {};
}
const dayOfWeek = [
  { value: "DOMINGO", label: "Domingo" },
  { value: "SEGUNDA", label: "Segunda" },
  { value: "TERCA", label: "Ter\xE7a" },
  { value: "QUARTA", label: "Quarta" },
  { value: "QUINTA", label: "Quinta" },
  { value: "SEXTA", label: "Sexta" },
  { value: "SABADO", label: "S\xE1bado" }
];
const conselhos = [
  { label: "CRAS", value: "CRAS" },
  { label: "COREN", value: "COREN" },
  { label: "CRF", value: "CRF" },
  { label: "CRFA", value: "CRFA" },
  { label: "CREFITO", value: "CREFITO" },
  { label: "CRM", value: "CRM" },
  { label: "CRN", value: "CRN" },
  { label: "CRO", value: "CRO" },
  { label: "CRP", value: "CRP" },
  { label: "CBO", value: "CBO" },
  { label: "Outros", value: "Outros" }
];
const guideStatus = [
  { label: "Emitida", value: 4 },
  { label: "Executada", value: 5 },
  { label: "Cancelado", value: 7 }
];
const agendaCalendarTypes = [
  { label: "Sem atendimento", value: "SA", color: "is-primary" },
  { label: "Todos livres", value: "TL", color: "is-success" },
  { label: "H\xE1 vagas", value: "HV", color: "is-info" },
  { label: "Todos ocupados", value: "TO", color: "is-warning" },
  { label: "Bloqueado", value: "B0", color: "is-danger" },
  { label: "Feriado", value: "F", color: "is-warning" }
];
function getAgendaCalendarTypes(value) {
  return agendaCalendarTypes.find((item) => item.value === value);
}
const agendamentoStatus = [
  { value: "L", label: "Livre", color: "is-primary" },
  { value: "A", label: "Agendado", color: "is-success" },
  { value: "R", label: "Reservado", color: "is-warning" },
  { value: "CO", label: "Confirmado", color: "is-success" },
  { value: "CA", label: "Cancelado", color: "is-danger" },
  { value: "PC", label: "Paciente n\xE3o compareceu", color: "is-danger" },
  { value: "MF", label: "M\xE9dico faltou", color: "is-danger" },
  { value: "EX", label: "Executado", color: "is-secondary" },
  { value: "BO", label: "Bloqueado", color: "is-danger" }
];
function getAgendamentoStatus(value) {
  return agendamentoStatus.find((item) => item.value === value) || agendamentoStatus[0];
}

function isCPF(value) {
  try {
    return value?.toString().replace(/[^0-9]/g, "").length === 11;
  } catch {
    return false;
  }
}
function isCNPJ(value) {
  try {
    return value?.toString().replace(/[^0-9]/g, "").length === 14;
  } catch {
    return false;
  }
}
function isEditFormByRouteName(routeName) {
  try {
    return routeName?.toString().includes("-edit");
  } catch {
    return false;
  }
}

function addUTC(date) {
  try {
    if (!date)
      return "";
    if (typeof date !== "string" || date.length > 10)
      return date;
    return date.replaceAll("-", "/");
  } catch (error) {
    return "";
  }
}
function formatDate(date) {
  try {
    if (!date)
      return "";
    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(addUTC(date)));
  } catch {
    return "";
  }
}
function addDateMask(date) {
  if (!date)
    return "";
  const maskedDate = date.replace(/\D/g, "");
  if (maskedDate?.length < 3)
    return maskedDate;
  if (maskedDate?.length < 5)
    return `${maskedDate.slice(0, 2)}/${maskedDate.slice(2, 4)}`;
  return `${maskedDate.slice(0, 2)}/${maskedDate.slice(2, 4)}/${maskedDate.slice(4)}`;
}
function removeDateMask(date) {
  if (!date)
    return "";
  date = date.replace(/\D/g, "");
  if (date?.length === 4)
    return `${date.slice(0, 4)}-`;
  if (date?.length === 6)
    return `${date.slice(0, 4)}-${date.slice(4, 6)}-`;
  return date;
}
function addDateMMAAAAMask(date) {
  if (!date)
    return "";
  const maskedDate = date.replace(/\D/g, "");
  if (maskedDate?.length < 3)
    return maskedDate;
  return `${maskedDate.slice(0, 2)}/${maskedDate.slice(2)}`;
}
function removeDateMMAAAAMask(date) {
  if (!date)
    return "";
  date = date.replace(/\D/g, "");
  if (date?.length === 4)
    return `${date.slice(0, 4)}-`;
  return date;
}
function formatDateMMAAAA(date) {
  try {
    if (!date)
      return "";
    if (date.length == 4)
      date = `20${date.slice(2)}-${date.slice(0, 2)}`;
    return Intl.DateTimeFormat("pt-BR", {
      month: "2-digit",
      year: "numeric"
    }).format(new Date(addUTC(date)));
  } catch {
    return "";
  }
}
function addHoursMask(hours) {
  hours = hours.replaceAll(/\D/g, "");
  let hour = hours.slice(0, 2);
  let minute = hours.slice(2, 4);
  if (Number(hour[0]) > 2)
    hour = `2${hour[1] || ""}`;
  if (Number(hour) > 23)
    hour = "23";
  if (Number(minute[0]) > 5)
    minute = `5${minute[1] || ""}`;
  if (Number(minute) > 59)
    minute = "59";
  if (hours.length > 2)
    return `${hour}:${minute}`;
  return hour;
}
function formatHours(hours) {
  try {
    if (!hours)
      return "";
    const hour = Number(hours.slice(0, 2));
    const min = Number(hours.slice(3, 5));
    return Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      minute: "numeric"
    }).format(new Date().setHours(hour, min));
  } catch (error) {
    return "";
  }
}
function formatDateTime(date, hour) {
  try {
    if (date?.includes("T")) {
      try {
        const [newDate, newHour] = date.split("T");
        date = newDate;
        hour = newHour.substring(0, 5);
      } catch {
        hour = "";
      }
    }
    if (!date)
      return "";
    if (!hour)
      return formatDate(date);
    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(new Date(`${addUTC(date)} ${hour}`));
  } catch (error) {
    return "";
  }
}
function formatDateEn(date) {
  try {
    if (typeof date.toString === "function")
      date = date.toString();
    if (typeof date !== "string" && !date.includes("/") || String(date).length > 14)
      date = formatDate(date);
    if (date.includes("/"))
      return date.split("/").reverse().join("-");
    return `${date.slice(4, 8)}-${date.slice(2, 4)}-${date.slice(0, 2)}`;
  } catch (error) {
    return "";
  }
}
function formatDateTimeEn(date, hour) {
  try {
    return `${formatDateEn(date)} ${hour}`;
  } catch (error) {
    return "";
  }
}
function formatDateLong(date) {
  try {
    if (!date)
      return "";
    if (date.includes("/"))
      date = formatDateEn(date);
    const formattedDate = Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(addUTC(date)));
    return formattedDate;
  } catch (error) {
    return "";
  }
}
function formatFullDateLong(date) {
  try {
    if (!date)
      return "";
    if (date.includes("/"))
      date = formatDateEn(date);
    const formattedDate = Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(addUTC(date)));
    return formattedDate;
  } catch (error) {
    return "";
  }
}
function formatNumericDateLong(date) {
  try {
    if (!date)
      return "";
    const formattedDate = Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric"
    }).format(new Date(addUTC(date)));
    return formattedDate;
  } catch (error) {
    return "";
  }
}
function formatDateTimeLong(date, hour) {
  try {
    if (date?.includes("T")) {
      try {
        const [newDate, newHour] = date.split("T");
        date = newDate;
        hour = newHour.substring(0, 5);
      } catch {
        hour = "";
      }
    }
    if (date && !hour)
      return formatDateLong(date);
    if (!date)
      return "";
    return Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(new Date(`${addUTC(date)} ${hour}`));
  } catch (error) {
    return "";
  }
}
function getHourInDate(date) {
  try {
    let hour = "";
    hour = date?.split("T")[1].substring(0, 5) || "";
    return hour;
  } catch {
    return "";
  }
}

function formatMoneyNumberToString(value) {
  try {
    if (value === void 0)
      return "";
    const newValue = value.toString();
    if (newValue.includes("."))
      return newValue;
    return `${newValue}.00`;
  } catch (error) {
    return "";
  }
}
function formatPhone(phone) {
  try {
    if (!phone)
      return "";
    phone = removePhoneMask(phone);
    if (phone.length === 13)
      return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 9)}-${phone.slice(9)}`;
    if (phone.length === 12)
      return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 8)}-${phone.slice(8)}`;
    if (phone.length === 11)
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    if (phone.length === 10)
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
    return phone;
  } catch {
    return phone || "";
  }
}
function removePhoneMask(phone) {
  try {
    if (!phone)
      return "";
    return phone.replace(/\D/g, "");
  } catch {
    return phone || "";
  }
}
function formatFileName(aq_arquivo = "") {
  try {
    return aq_arquivo.split("arquivo/")[1].split("?X-Amz")[0];
  } catch {
    return aq_arquivo;
  }
}
function addMoneyMask(value) {
  if (value === void 0)
    value = 0;
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}
function removeMoneyMask(value) {
  if (value === void 0)
    return "00.00";
  return value.replace(/\./g, "").replace(",", ".").replace("R$ ", "");
}
function removeMoneyMaskAndConvert(value) {
  return parseFloat(removeMoneyMask(value));
}
function formatCPF(value) {
  if (!value)
    return "";
  return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function removeCPFMask(value) {
  return value.replace(/\./g, "").replace(/-/g, "");
}
function formatCPFToLGPD(value) {
  try {
    if (!value)
      return "";
    return `***.${formatCPF(value).slice(4, 11)}-**`;
  } catch {
    return value;
  }
}
function removeCNPJMask(value) {
  return value.replace(/\./g, "").replace(/-/g, "").replace(/\//g, "");
}
function formatLocality(ob_cidade) {
  if (!ob_cidade?.nm_cidade || !ob_cidade.ds_uf)
    return "";
  return `${ob_cidade.nm_cidade} / ${ob_cidade.ds_uf}`;
}
function formatLocalityLong(ob_cidade) {
  if (!ob_cidade?.nm_cidade || !ob_cidade.cd_estado?.nm_estado)
    return "";
  return `${ob_cidade.nm_cidade} / ${ob_cidade.cd_estado?.nm_estado}`;
}
function formatZipCode(zipCode) {
  return zipCode.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/\.(\d{3})(\d)/, ".$1-$2");
}
function removeFormatZipCode(zipCode) {
  return zipCode.replaceAll(".", "").replaceAll("-", "");
}
function formatGender(value) {
  return !value ? "Outro" : value.toLowerCase() === "m" ? "Masculino" : "Feminino";
}
function formatCreditCard(value) {
  return value?.replace(/[^0-9]/, "") || "";
}

function detectCardType(number) {
  const re = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  };
  for (const key in re) {
    if (re[key].test(number)) {
      return key;
    }
  }
}
function compareDates(date) {
  const today = new Date();
  const dateOBJ = new Date(date.includes("T") ? date : date.replaceAll("-", "/"));
  return new Date(dateOBJ.setDate(dateOBJ.getDate() + 1)) >= today ? true : false;
}
function getUserName(firstName, lastName, full = true) {
  const name = String(`${firstName} ${lastName}`.trim());
  if (name === "undefined")
    return "";
  if (!full && name?.length > 16)
    return name.split(" ")[0];
  return name;
}
function splitUserName(userName) {
  const userNameSlices = userName.split(" ");
  const firstName = userNameSlices.slice(0, userNameSlices.length > 2 ? 2 : 1).join(" ");
  const lastName = userNameSlices.slice(userNameSlices.length > 2 ? 2 : 1).join(" ");
  return [firstName || "", lastName || ""];
}

const localeConfig = {
  firstDayOfWeek: 0,
  dayNames: ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
  dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Mar\xE7o",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  today: "Hoje",
  clear: "Limpar",
  dateFormat: "dd/mm/yy",
  weekHeader: "Sem",
  startsWith: "Come\xE7a com",
  contains: "Cont\xE9m",
  notContains: "N\xE3o cont\xE9m",
  endsWith: "Termina com",
  equals: "\xC9 igual",
  notEquals: "N\xE3o \xE9 igual",
  noFilter: "Sem filtro",
  lt: "Menor que",
  lte: "Menos que ou igual a",
  gt: "Maior que",
  gte: "Melhor que ou igual a",
  dateIs: "Data \xE9",
  dateIsNot: "Data n\xE3o \xE9",
  dateBefore: "A data \xE9 antes",
  dateAfter: "A data \xE9 depois",
  apply: "Aplicar",
  matchAll: "Combinar tudo",
  matchAny: "Corresponder a qualquer",
  addRule: "Adicionar regra",
  removeRule: "Remover regra",
  accept: "Sim",
  reject: "N\xE3o",
  choose: "Escolher",
  upload: "Enviar",
  cancel: "Cancelar",
  weak: "Fraco",
  medium: "M\xE9dio",
  strong: "Forte",
  passwordPrompt: "Entre com uma senha",
  emptyFilterMessage: "Nenhum resultado encontrado",
  emptyMessage: "Sem op\xE7\xF5es dispon\xEDveis"
};

function useDownloadFile(createElement, createObjectURL, Blob) {
  function downloadPDF({ content }) {
    const linkEl = createElement("a");
    linkEl.href = createObjectURL(new Blob([content], { type: "application/pdf" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.pdf`);
    linkEl.click();
  }
  function downloadCSV({ content }) {
    const linkEl = createElement("a");
    linkEl.href = createObjectURL(new Blob([content], { type: "application/csv" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.csv`);
    linkEl.click();
  }
  return { downloadPDF, downloadCSV };
}

function useFilter({ ignore } = { ignore: [] }) {
  const route = useRoute();
  ignore?.push("pg");
  const hasFilters = computed(() => Object.keys(route.query).filter((item) => !ignore.includes(item)).length);
  const hasAnyFilters = computed(() => Object.keys(route.query).filter((item) => !["pg"].includes(item)).length);
  const hasSpecificFilter = (items) => Boolean(Object.keys(route.query).find((query) => items.includes(query)));
  return { hasFilters, hasAnyFilters, hasSpecificFilter };
}

function usePagination(params) {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const [module, secondaryModule] = params.module.split(".");
  const pagination = computed(() => (secondaryModule ? store.state[module][secondaryModule] : store.state[module])[params.field || "pagination"]);
  function handleUpdateCurrentPage(event) {
    const page = event.page + 1;
    router.replace({ query: { ...route.query, pg: page } });
    store.commit(params.setPage, { page });
    params.updateList();
  }
  store.commit(params.setPage, { page: 1 });
  router.replace({ query: { ...route.query, pg: 1 } });
  return { pagination, handleUpdateCurrentPage };
}

export { addDateMMAAAAMask, addDateMask, addHoursMask, addMoneyMask, addUTC, agendaCalendarTypes, agendaTypeOptions, agendamentoStatus, compareDates, conselhos, dayOfWeek, detectCardType, formatCPF, formatCPFToLGPD, formatCreditCard, formatDate, formatDateEn, formatDateLong, formatDateMMAAAA, formatDateTime, formatDateTimeEn, formatDateTimeLong, formatFileName, formatFullDateLong, formatGender, formatHours, formatLocality, formatLocalityLong, formatMoneyNumberToString, formatNumericDateLong, formatPhone, formatZipCode, genderOptions, getAgendaCalendarTypes, getAgendaTypeOptions, getAgendamentoStatus, getHourInDate, getUserName, guideStatus, isCNPJ, isCPF, isEditFormByRouteName, localeConfig, removeCNPJMask, removeCPFMask, removeDateMMAAAAMask, removeDateMask, removeFormatZipCode, removeMoneyMask, removeMoneyMaskAndConvert, removePhoneMask, sexOptions, splitUserName, useDownloadFile, useFilter, usePagination };
//# sourceMappingURL=obsis-utils.mjs.map
