import produce, {enableMapSet} from "immer";
import create from "zustand";
import {persist} from "zustand/middleware";
import {actionStorePersisConfig} from "../configs/persist.config";

enableMapSet();

export enum ActionType {
    INPUT = 'action/input',
    SELECT = 'action/select',
    CHECKBOX = 'action/checkbox',
    TEXTAREA = 'action/textarea',
    MULTISELECT = 'action/multiselect'
}

export type ActionDataEntity = {
    id: string;
    name: string;
    isDefault: boolean;
}

export type ActionEntity = {
    id: string;
    type: ActionType;
    actionId: string;
    name: string;
    description?: string,
    label?: string;
    color?: string | null;
    data?: ActionDataEntity[];
}

export type ActionStoreState = {
    actions: Map<string, ActionEntity>;
    openNewActionState: boolean;
    setAction: (action: ActionEntity) => void;
    editAction: (action: ActionEntity) => void;
    deleteAction: (actionId: string) => void;
    changeNewActionState: (state: boolean) => void;
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
    openNewActionState: false,
    _hasHydrated: false,
    setAction: (action: ActionEntity) => {
        set(produce((draft: ActionStoreState) => {
            draft.actions.set(action.actionId, action)
        }))
    },
    editAction: (action: ActionEntity) => {
        set(produce((draft: ActionStoreState) => {
            draft.actions.set(action.actionId, action);
        }))
    },
    deleteAction: (actionId: string) => {
        set(produce((draft: ActionStoreState) => {
            const result: boolean = draft.actions.delete(actionId);
            if (!result) {
                throw new Error(`Action cant by deleted.`);
            }
        }))
    },
    changeNewActionState: (state: boolean) => {
        set(produce((draft: ActionStoreState) => {
            draft.openNewActionState = state;
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