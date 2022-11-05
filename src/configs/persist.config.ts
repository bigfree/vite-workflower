import {PersistOptions} from "zustand/middleware";
import {ActionEntity, ActionStoreState} from "../store/action.store";
import {AppStoreState} from "../store/app.store";
import {EdgeEntity, FlowStoreState, NodeEntity} from "../store/flow.store";
import {ModalEntity, ModalStoreState, ModalType} from "../store/modal.store";

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

/**
 * Action Store Persist config
 */
export const actionStorePersisConfig: PersistOptions<ActionStoreState> = {
    name: 'actionsStore',
    serialize: (data) => {
        return JSON.stringify({
            ...data,
            state: {
                ...data.state,
                nodes: Array.from(data.state.actions as Map<string, ActionEntity>),
            }
        });
    },
    deserialize: (value) => {
        const data = JSON.parse(value);
        data.state.actions = new Map<string, ActionEntity>(data.state.actions);
        return data;
    },
    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
    }
}

export const modalStorePersisConfig: PersistOptions<ModalStoreState> = {
    name: 'modalsStore',
    serialize: (data) => {
        return JSON.stringify({
            ...data,
            state: {
                ...data.state,
                modals: Array.from(data.state.modals as Map<string | ModalType, ModalEntity>),
            }
        });
    },
    deserialize: (value) => {
        const data = JSON.parse(value);
        data.state.modals = new Map<string | ModalType, ModalEntity>(data.state.modals);
        return data;
    },
    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
    }
}