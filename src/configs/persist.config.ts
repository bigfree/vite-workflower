import {PersistOptions} from "zustand/middleware";
import {AppStoreState} from "../store/app.store";
import {EdgeEntity, FlowStoreState, NodeEntity} from "../store/flow.store";

export const flowStorePersistConfig: PersistOptions<FlowStoreState> = {
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
        data.state.nodes = new Map<string, NodeEntity>(data.state.nodes);
        data.state.edges = new Map<string, EdgeEntity>(data.state.edges);
        return data;
    },
    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
    }
}

export const appStorePersisConfig: PersistOptions<AppStoreState> = {
    name: 'appStore',
}