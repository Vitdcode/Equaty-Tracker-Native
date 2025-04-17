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
  setRent: (fixCosts) =>
    set((state) => ({
      fixCosts: state.fixCosts.map((prev) =>
        prev.id === fixCosts.id ? { ...fixCosts, rent: fixCosts.rent } : fixCosts
      ),
    })),

  setNewFixCost: (name, value) =>
    set((state) => ({
      fixCosts: [...state.fixCosts, { name: name, cost: value }],
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

export default useCounterStore;
