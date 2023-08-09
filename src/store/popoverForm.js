import { create } from "zustand";

export const usePopoverForm = create((set) => ({
    popData: {},
    popDataFn: (data) => set((state) => ({ popData: data })),
}));
