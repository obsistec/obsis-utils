import { AgendaCalendarType } from "@/store/agenda/types";

export function detectCardType(number: string) {
  const re: { [key: string]: any } = {
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
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (const key in re) {
    if (re[key].test(number)) {
      return key;
    }
  }
}

export const genderOptions = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
  { label: "Não aplicável", value: "N" },
];

export const sexOptions = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
];

export const agendaTypeOptions = [
  { label: "Consulta", value: "C" },
  { label: "Exame", value: "E" },
  { label: "Laboratório", value: "L" },
  { label: "Procedimento", value: "P" },
];

export function getAgendaTypeOptions(value: string) {
  return agendaTypeOptions.find((item) => item.value === value) || {};
}

export const dayOfWeek = [
  { value: "DOMINGO", label: "Domingo" },
  { value: "SEGUNDA", label: "Segunda" },
  { value: "TERCA", label: "Terça" },
  { value: "QUARTA", label: "Quarta" },
  { value: "QUINTA", label: "Quinta" },
  { value: "SEXTA", label: "Sexta" },
  { value: "SABADO", label: "Sábado" },
];

export function compareDates(date: string) {
  const today = new Date();
  const dateOBJ = new Date(date.includes("T") ? date : date.replaceAll("-", "/"));

  return new Date(dateOBJ.setDate(dateOBJ.getDate() + 1)) >= today ? true : false;
}

export function getUserName(firstName?: string, lastName?: string, full = true) {
  const name = String(`${firstName} ${lastName}`.trim());

  if (name === "undefined") return "";
  if (!full && name?.length > 16) return name.split(" ")[0];

  return name;
}

export function splitUserName(userName: string) {
  const userNameSlices = userName.split(" ");

  const firstName = userNameSlices.slice(0, userNameSlices.length > 2 ? 2 : 1).join(" ");
  const lastName = userNameSlices.slice(userNameSlices.length > 2 ? 2 : 1).join(" ");

  return [firstName || "", lastName || ""];
}

export const conselhos = [
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
  { label: "Outros", value: "Outros" },
];

export const guideStatus = [
  { label: "Emitida", value: 4 },
  { label: "Executada", value: 5 },
  { label: "Cancelado", value: 7 },
];

export const agendaCalendarTypes = [
  { label: "Sem atendimento", value: "SA", color: "is-primary" },
  { label: "Todos livres", value: "TL", color: "is-success" },
  { label: "Há vagas", value: "HV", color: "is-info" },
  { label: "Todos ocupados", value: "TO", color: "is-warning" },
  { label: "Bloqueado", value: "B0", color: "is-danger" },
  { label: "Feriado", value: "F", color: "is-warning" },
];

export function getAgendaCalendarTypes(value: AgendaCalendarType) {
  return agendaCalendarTypes.find((item) => item.value === value);
}

export const agendamentoStatus = [
  { value: "L", label: "Livre", color: "is-primary" },
  { value: "A", label: "Agendado", color: "is-success" },
  { value: "R", label: "Reservado", color: "is-warning" },
  { value: "CO", label: "Confirmado", color: "is-success" },
  { value: "CA", label: "Cancelado", color: "is-danger" },
  { value: "PC", label: "Paciente não compareceu", color: "is-danger" },
  { value: "MF", label: "Médico faltou", color: "is-danger" },
  { value: "EX", label: "Executado", color: "is-secondary" },
  { value: "BO", label: "Bloqueado", color: "is-danger" },
];

export function getAgendamentoStatus(value: string) {
  return agendamentoStatus.find((item) => item.value === value) || agendamentoStatus[0];
}
