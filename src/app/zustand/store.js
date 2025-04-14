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

export default useCounterStore;
