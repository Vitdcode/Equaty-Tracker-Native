import { create } from "zustand";
import metricDate from "../js-functions/date-metric-format";

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export const useTextStore = create((set) => ({
  text: "",
  setText: (newText) => set({ text: newText }),
}));

export const useMoneyStore = create((set) => ({
  income: 2700,
  isIncomeEdit: false,
  setIsIncomeEdit: () => set((state) => ({ isIncomeEdit: !state.isIncomeEdit })),
  setIncome: (newIncome) => set((state) => ({ income: newIncome })),
}));

export const useFixCostsStore = create((set, get) => ({
  fixCosts: [
    { name: "Miete", cost: "675.05" },
    { name: "Strom", cost: "50.00" },
    { name: "KFZ Versicherung", cost: "47.51" },
    { name: "Hausrat", cost: "12.78" },
    { name: "Haftpflicht", cost: "2.83" },
    { name: "Tanken", cost: "40.00" },
    { name: "Friseur", cost: "21.00" },
    { name: "Einkaufen", cost: "351.00" },
    { name: "Investment", cost: "800.00" },
  ],

  setNewFixCost: (name, value) =>
    set((state) => ({
      fixCosts: [...state.fixCosts, { name: name, cost: value }],
    })),

  editFixItem: (index, field, value) =>
    set((state) => ({
      fixCosts: state.fixCosts.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    })),

  sum: () => {
    const { fixCosts } = get();
    let total = 0;

    fixCosts.forEach((item) => {
      const num = item.cost.includes(",")
        ? parseFloat(item.cost.replace(",", "."))
        : parseFloat(item.cost);
      total += num;
    });

    return total;
  },
}));

export const useSubsStore = create((set, get) => ({
  subs: [
    { name: "Youtube Premium", cost: "12.99" },
    { name: "Gym", cost: "33.9" },
  ],

  setNewSub: (name, value) =>
    set((state) => ({
      subs: [...state.subs, { name: name, cost: value }],
    })),

  editSub: (index, field, value) =>
    set((state) => ({
      subs: state.subs.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    })),

  sum: () => {
    const { subs } = get();
    let total = 0;

    subs.forEach((item) => {
      const num = item.cost.includes(",")
        ? parseFloat(item.cost.replace(",", "."))
        : parseFloat(item.cost);
      total += num;
    });

    return total;
  },
}));

export const useAssetsStore = create((set, get) => ({
  /*   assets: [
    {
      date: "29.07.2024",
      investiert: 17089,
      "Cash Trade Republic": 4000,
      "C24 Tagesgeld": 1714,
      Cash: 3000,
    },
    {
      date: "29.07.2024",
      investiert: 17089,
      "Cash Trade Republic": 4000,
      "C24 Tagesgeld": 1714,
      Cash: 3000,
    },
  ],

  stockData: [
    {
      date: "29.07.2024",
      "S&P 500": 531.18,
    },
    {
      date: "29.07.2024",
      "S&P 500": 531.18,
    },
  ], */

  allAssets: [
    [
      {
        name: "General Assets",
        date: "29.07.2024",
        data: {
          Investiert: 17089,
          "Cash Trade Republic": 4000,
          "C24 Tagesgeld": 1714,
          Cash: 3000,
        },
      },
      {
        name: "Stock Data",
        data: {
          "S&P 500": 531.18,
        },
      },
    ],
    [
      {
        name: "General Assets",
        date: "30.07.2025",
        data: {
          Investiert: 17189,
          "Cash Trade Republic": 4000,
          "C24 Tagesgeld": 1714,
          Cash: 3000,
        },
      },
      {
        name: "Stock Data",
        data: {
          "S&P 500": 531.18,
        },
      },
    ],
  ],

  setNewAsset: (investValue, tradeRepCash, c24Cash, cash, sp500) =>
    set((state) => ({
      assets: [
        ...state.assets,
        [
          {
            name: "General Assets",
            date: metricDate(),
            data: {
              Investiert: investValue,
              "Cash Trade Republic": tradeRepCash,
              "C24 Tagesgeld": c24Cash,
              Cash: cash,
            },
          },
          {
            name: "Stock Data",
            data: {
              "S&P 500": sp500,
            },
          },
        ],
      ],
    })),

  editAsset: (index, field, value) =>
    set((state) => ({
      assets: state.assets.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    })),
}));

export default useCounterStore;
