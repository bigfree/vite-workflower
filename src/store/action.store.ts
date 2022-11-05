import produce, {enableMapSet} from "immer";
import create from "zustand";
import {persist} from "zustand/middleware";
import {actionStorePersisConfig} from "../configs/persist.config";

enableMapSet();

export enum ActionType {
    INPUT = 'input',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'textarea',
    MULTISELECT = 'multiselect'
}

export type ActionEntity = {
    id: string;
    externalId: string;
    name: string;
    color?: string | null;
    type: ActionType;
    data: [];
}

export type ActionStoreState = {
    actions: Map<string, ActionEntity>;
    addAction: (action: ActionEntity) => void;
    editAction: (action: ActionEntity) => void;
    deleteAction: (actionId: string) => void;
    getAction: (actionId: string) => ActionEntity | undefined;
    getAllActions: () => ActionEntity[];
    _hasHydrated: boolean,
    setHasHydrated: (state: boolean) => void;
}

/**
 * Action store
 */
const useActionStore = create<ActionStoreState>()(persist((set, get) => ({
    actions: new Map([]),
    _hasHydrated: false,
    addAction: (action: ActionEntity) => {
        set(produce((draft: ActionStoreState) => {
            draft.actions.set(action.id, action);
        }))
    },
    editAction: (action: ActionEntity) => {
        set(produce((draft: ActionStoreState) => {
            draft.actions.set(action.id, action);
        }))
    },
    deleteAction: (actionId: string) => {
        set(produce((draft: ActionStoreState) => {
            const result: boolean = draft.actions.delete(actionId);
            if (!result) {
                throw new Error(`Action can't by deleted.`);
            }
        }))
    },
    getAction: (actionId: string): ActionEntity | undefined => {
        return get().actions.get(actionId);
    },
    getAllActions: () => {
        return Array.from(get().actions.values()) as ActionEntity[];
    },
    setHasHydrated: (state: boolean) => {
        set(produce((draft: ActionStoreState) => {
            draft._hasHydrated = state;
        }));
    }
}), actionStorePersisConfig));

export default useActionStore;