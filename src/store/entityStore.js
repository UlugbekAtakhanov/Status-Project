import { create } from "zustand";

export const useEntityStore = create((set) => ({
    entities: [],
    getEntities: (data) =>
        set((state) => {
            return (state.entities = data);
        }),

    addEntity: (data) =>
        set((state) => {
            return (state.entities = [...state.entities, data]);
        }),

    updateEntity: (id, data) =>
        set((state) => {
            const item = state.entities.findIndex((item) => item.id === id);
            return (state.entities[item] = {
                ...state.entities[item],
                ...data,
            });
        }),
}));
