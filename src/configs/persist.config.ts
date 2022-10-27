import {PersistOptions} from "zustand/middleware";
import {EdgeEntity, FlowStoreState, NodeEntity} from "../store/flow.store";

export const persistConfig: PersistOptions<FlowStoreState> = {
    name: 'flowStore',
    serialize: (data) => {
        return JSON.stringify({
            ...data,
            state: {
                ...data.state,
                nodes: Array.from(data.state.nodes as Map<string, NodeEntity>),
                edges: Array.from(data.state.edges as Map<string, EdgeEntity>),
            }
        });
    },
    deserialize: (value) => {
        const data = JSON.parse(value);
        data.state.nodes = new Map(data.state.nodes);
        data.state.edges = new Map(data.state.edges);
        return data;
    },
    onRehydrateStorage: () => (state) => {
        console.log(state);
        state?.setHasHydrated(true);
    }
}