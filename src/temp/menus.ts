export default [
  {
    label: "Pacientes",
    to: { name: "patient-list" },
    icon: "fas fa-hospital-user",
  },
  {
    label: "Especialistas",
    to: { name: "specialist-list" },
    icon: "fas fa-user-md",
  },
  {
    label: "Usuários",
    to: { name: "employee-list" },
    icon: "fas fa-user-friends",
  },
  {
    label: "Financeiro",
    icon: "fas fa-wallet",
    items: [
      {
        label: "Caixas",
        to: { name: "cashier-list" },
        icon: "fas fa-cash-register",
      },
      {
        label: "Histórico de caixa",
        to: { name: "cashier-historic-list" },
        icon: "fas fa-history",
      },
      {
        label: "Transações",
        to: { name: "cashier-transaction-list" },
        icon: "fas fa-coins",
      },
      {
        label: "Movimentações",
        to: { name: "cashier-movement-list" },
        icon: "fas fa-landmark",
      },
      {
        label: "Faturamento",
        to: { name: "payment-list" },
        icon: "fas fa-money-check-alt",
      },
    ],
  },
  {
    label: "Procedimentos",
    icon: "fas fa-briefcase-medical",
    items: [
      {
        label: "Negociados",
        to: { name: "establishment-procedure-list" },
        icon: "fas fa-hand-holding-heart",
      },
      {
        label: "CBHPM",
        to: { name: "procedure-list" },
        icon: "fas fa-hospital-alt",
      },
    ],
  },
  {
    label: "Parceiros",
    to: { name: "unit-list" },
    icon: "fas fa-hospital",
  },
  {
    label: "Clínicas",
    to: { name: "establishment-list" },
    icon: "fas fa-hospital-alt",
  },
];
