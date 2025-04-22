import { create } from "zustand";
import metricDate from "../js-functions/date-metric-format";
import * as Crypto from "expo-crypto";

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
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
  selectedYear: new Date().getFullYear(),
  setSelectedYear: (year) => set((state) => ({ selectedYear: year })),

  selectedYearStatistics: new Date().getFullYear(),
  setSelectedYearStatistics: (year) => set((state) => ({ selectedYearStatistics: year })),

  newPortfolioCardIsEdit: false,
  setNewPortfolioCardIsEdit: () =>
    set((state) => ({ newPortfolioCardIsEdit: !state.newPortfolioCardIsEdit })),

  portfolioCardIsEdit: false,
  setPortfolioCardIsEdit: () =>
    set((state) => ({ portfolioCardIsEdit: !state.portfolioCardIsEdit })),

  portFolioCardId: null,
  setPortfolioCardId: (id) => set((state) => ({ portFolioCardId: id })),

  /*   allAssets: [ //real data
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "29.07.2024",
      generalAssets: {
        Investiert: 17089,
        "Cash Trade Republic": 4000,
        "C24 Tagesgeld": 1714,
        Cash: 3000,
      },

      stockData: {
        "S&P 500": 531.18,
      },
    },

    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "29.10.2024",
      generalAssets: {
        Investiert: 22909.85,
        "Cash Trade Republic": 4861.33,
        "C24 Tagesgeld": 2003.62,
        Cash: 3000,
      },

      stockData: {
        "S&P 500": 570.3,
      },
    },

    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.02.2025",
      generalAssets: {
        Investiert: 29276,
        "Cash Trade Republic": 3994,
        "C24 Tagesgeld": 1132,
        Cash: 3000,
      },
      stockData: {
        "S&P 500": 531.18,
        Bitcon: 98148,
        XRP: 2.87,
      },
    },
  ], */

  allAssets: [
    // dummy data for chart testing
    // 2024 (Q1-Q4)
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.04.2024",
      generalAssets: {
        Investiert: 15000,
        "Cash Trade Republic": 3500,
        "C24 Tagesgeld": 1200,
        Cash: 2500,
      },
      stockData: { "S&P 500": 520.15 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.07.2024",
      generalAssets: {
        Investiert: 17089,
        "Cash Trade Republic": 4000,
        "C24 Tagesgeld": 1714,
        Cash: 3000,
      },
      stockData: { "S&P 500": 531.18 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.10.2024",
      generalAssets: {
        Investiert: 22909.85,
        "Cash Trade Republic": 4861.33,
        "C24 Tagesgeld": 2003.62,
        Cash: 3000,
      },
      stockData: { "S&P 500": 570.3 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.01.2025",
      generalAssets: {
        Investiert: 25000,
        "Cash Trade Republic": 5200,
        "C24 Tagesgeld": 2100,
        Cash: 3200,
      },
      stockData: { "S&P 500": 495.75 },
    },

    // 2025 (Q1-Q4)
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.04.2025",
      generalAssets: {
        Investiert: 29276,
        "Cash Trade Republic": 3994,
        "C24 Tagesgeld": 1132,
        Cash: 3000,
      },
      stockData: { "S&P 500": 531.18 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.07.2025",
      generalAssets: {
        Investiert: 31500.5,
        "Cash Trade Republic": 4100.2,
        "C24 Tagesgeld": 1800.75,
        Cash: 3500,
      },
      stockData: { "S&P 500": 610.42 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.10.2025",
      generalAssets: {
        Investiert: 34000,
        "Cash Trade Republic": 4500,
        "C24 Tagesgeld": 2200,
        Cash: 3800,
      },
      stockData: { "S&P 500": 590.1 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.01.2026",
      generalAssets: {
        Investiert: 36500.3,
        "Cash Trade Republic": 4800.9,
        "C24 Tagesgeld": 2400.6,
        Cash: 4000,
      },
      stockData: { "S&P 500": 625.8 },
    },

    // 2026 (Q1-Q4)
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.04.2026",
      generalAssets: {
        Investiert: 40000,
        "Cash Trade Republic": 5000,
        "C24 Tagesgeld": 2600,
        Cash: 4200,
      },
      stockData: { "S&P 500": 650.25 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.07.2026",
      generalAssets: {
        Investiert: 43200.75,
        "Cash Trade Republic": 5200.4,
        "C24 Tagesgeld": 2800.3,
        Cash: 4500,
      },
      stockData: { "S&P 500": 680.5 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.10.2026",
      generalAssets: {
        Investiert: 46000,
        "Cash Trade Republic": 5500,
        "C24 Tagesgeld": 3000,
        Cash: 4800,
      },
      stockData: { "S&P 500": 710.2 },
    },
    {
      id: Crypto.randomUUID(),
      name: "General Assets",
      date: "01.01.2027",
      generalAssets: {
        Investiert: 50000.6,
        "Cash Trade Republic": 6000.8,
        "C24 Tagesgeld": 3200.9,
        Cash: 5000,
      },
      stockData: { "S&P 500": 735.4 },
    },
  ],

  setNewAsset: () =>
    set((state) => ({
      allAssets: [
        ...state.allAssets,
        {
          id: Crypto.randomUUID(), // Add a unique ID for easier manipulation
          date: metricDate(),
          generalAssets: {
            Investiert: 0,
            "Cash Trade Republic": 0,
            "C24 Tagesgeld": 0,
            Cash: 0,
          },
          stockData: {
            "S&P 500": 0,
          },
        },
      ],
    })),

  editAssetValue: (field, value, id, objName) =>
    set((state) => ({
      allAssets: state.allAssets.map((assetData) =>
        assetData.id === id
          ? {
              ...assetData,
              [objName]: {
                ...assetData[objName],
                [field]: value,
              },
            }
          : assetData
      ),
    })),

  editAssetName: (oldName, newName, value, id, objName) =>
    set((state) => ({
      allAssets: state.allAssets.map((asset) => {
        if (asset.id === id) {
          // Create a copy of the object without the old key
          const { [oldName]: _, ...rest } = asset[objName];

          return {
            ...asset,
            [objName]: {
              ...rest, // Existing fields (excluding the old name)
              [newName]: value, // Add new field with updated name
            },
          };
        }
        return asset;
      }),
    })),

  addNewEntry: (id, objName, newKey = "", initialVal = 0) =>
    set((state) => ({
      allAssets: state.allAssets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            [objName]: {
              ...asset[objName],
              [newKey]: initialVal,
            },
          };
        }
        return asset;
      }),
    })),

  deleteEntry: (id, objName, field) =>
    set((state) => ({
      allAssets: state.allAssets.map((asset) => {
        if (asset.id === id) {
          // Create a new object with the filtered property
          const updatedAsset = {
            ...asset,
            [objName]: Object.fromEntries(
              Object.entries(asset[objName]).filter(([key]) => key !== field)
            ),
          };
          return updatedAsset;
        }
        return asset; // Return unchanged assets
      }),
    })),

  deleteCard: (id) => {
    set((state) => ({
      allAssets: state.allAssets.filter((asset) => asset.id != id),
    }));
  },
}));

export default useCounterStore;
