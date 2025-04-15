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

export const useFixCostsStore = create((set, get) => ({
  fixCosts: [{ rent: "675.05€", power: "50.00€" }],
  setRent: (fixCosts) =>
    set((state) => ({
      fixCosts: state.fixCosts.map((prev) =>
        prev.id === fixCosts.id ? { ...fixCosts, rent: fixCosts.rent } : fixCosts
      ),
    })),
  sum: () => {
    const { fixCosts } = get();
    let total = 0;

    fixCosts.forEach((item) => {
      Object.values(item).forEach((val) => {
        const num = parseFloat(val.replace("€", "").trim());
        total += num;
      });
    });

    return `${total}€`;
  },
}));

export default useCounterStore;
