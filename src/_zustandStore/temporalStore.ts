import create from "zustand";
import {temporal} from "zundo";

interface MyState {
    bears: number;
    increment: () => void;
    decrement: () => void;
}

export const useStore = create(
    temporal<MyState>((set) => ({
        bears: 0,
        increment: () => set((state) => ({bears: state.bears + 1})),
        decrement: () => set((state) => ({bears: state.bears - 1})),
    })),
);