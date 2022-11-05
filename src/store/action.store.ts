import produce, {enableMapSet} from "immer";
import {Size} from "re-resizable";
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
    openNewActionState: boolean;
    newActionStateSizes: Size;
    listActionStateSizes: Size;
    addAction: (action: ActionEntity) => void;
    editAction: (action: ActionEntity) => void;
    deleteAction: (actionId: string) => void;
    changeOpenNewAction: (state: boolean) => void;
    changeNewActionSizes: (sizes: Size) => void;
    changeListActionSizes: (sizes: Size) => void;
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
    newActionStateSizes: {
        width: 'auto',
        height: 'auto'
    },
    listActionStateSizes: {
        width: 'auto',
        height: 'auto'
    },
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
    changeOpenNewAction: (state: boolean) => {
        set(produce((draft: ActionStoreState) => {
            draft.openNewActionState = state;
        }))
    },
    changeNewActionSizes: (sizes: Size) => {
        set(produce((draft: ActionStoreState) => {
            draft.newActionStateSizes = sizes;
        }))
    },
    changeListActionSizes: (sizes: Size) => {
        set(produce((draft: ActionStoreState) => {
            draft.listActionStateSizes = sizes;
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