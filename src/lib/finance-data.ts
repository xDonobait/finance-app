export type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
};

export type MonthSummary = {
  month: string;
  transactions: Transaction[];
};

export type QuarterSummary = {
  quarter: string;
  months: MonthSummary[];
};

// Datos de ejemplo (puedes modificarlos)
export const financeData: QuarterSummary[] = [
  {
    quarter: "Q1",
    months: [
      {
        month: "Enero",
        transactions: [
          { id: 1, type: "income", amount: 1200, description: "Salario" },
          { id: 2, type: "expense", amount: 400, description: "Comida" },
        ],
      },
      {
        month: "Febrero",
        transactions: [
          { id: 3, type: "income", amount: 1200, description: "Salario" },
          { id: 4, type: "expense", amount: 200, description: "Transporte" },
        ],
      },
      {
        month: "Marzo",
        transactions: [],
      },
    ],
  },
  {
    quarter: "Q2",
    months: [
      {
        month: "Abril",
        transactions: [],
      },
      {
        month: "Mayo",
        transactions: [],
      },
      {
        month: "Junio",
        transactions: [],
      },
    ],
  },
];
