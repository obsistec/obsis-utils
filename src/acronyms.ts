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
  { label: "Consulta", title: "Consulta", value: "C" },
  { label: "Exame", title: "Exame de Imagem", value: "E" },
  { label: "Laboratório", title: "Exame Laboratorial", value: "L" },
  { label: "Procedimento", title: "Procedimento", value: "P" },
];

export function getAgendaTypeOptions(value: string) {
  return agendaTypeOptions.find((item) => item.value === value) || null;
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

export function getAgendaCalendarTypes(value: any) {
  return agendaCalendarTypes.find((item) => item.value === value) || null;
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

export const specialtyTypes = [
  { value: "C", label: "Consulta" },
  { value: "E", label: "Exame" },
  { value: "S", label: "Serviço" },
  { value: "CI", label: "Cirúrgica" },
];

export function getSpecialtyTypes(value: string) {
  return specialtyTypes.find((item) => item.value === value) || null;
}

export const batchSituations = [
  { value: "PG", label: "Pago" },
  { value: "CA", label: "Cancelado" },
  { value: "AB", label: "Aberto" },
];

export function getBatchSituation(value: string) {
  return batchSituations.find((item) => item.value === value) || null;
}
