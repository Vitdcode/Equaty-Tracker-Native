import { create } from "zustand";

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

export default useCounterStore;
