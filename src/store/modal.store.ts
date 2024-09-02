import {enableMapSet, produce} from "immer";
import create from "zustand";
import {persist} from "zustand/middleware";
import {modalStorePersisConfig} from "../configs/persist.config";

enableMapSet();

export enum ModalType {
    ACTION_NEW = 'action/new',
    ACTION_EDIT = 'action/edit',
    NODE_NEW = 'node/new',
    NODE_EDIT = 'node/edit',
}

type ModalEntityPositions = {
    x: number;
    y: number;
}

type ModalEntitySizes = {
    width: number;
    height: number;
}

export type ModalEntity = {
    id: string;
    type: ModalType;
    open: boolean;
    positions?: ModalEntityPositions;
    sizes?: ModalEntitySizes;
}

export type ModalStoreState = {
    modals: Map<string | ModalType, ModalEntity>;
    _hasHydrated: boolean,
    setModal: (modal: ModalEntity) => void;
    deleteModal: (modalId: string | ModalType) => void;
    getAllModalsArray: () => ModalEntity[];
    getModal: (modalId: string | ModalType) => ModalEntity;
    setHasHydrated: (state: boolean) => void;
}

const useModalStore = create<ModalStoreState>()(persist((set, get) => ({
    modals: new Map([]),
    _hasHydrated: false,
    setModal: (modal: ModalEntity) => {
        set(produce((draft: ModalStoreState) => {
            draft.modals.set(modal.id, {
                ...modal,
                positions: modal.positions ? modal.positions : get().modals.get(modal.id)?.positions
            });
        }))
    },
    deleteModal: (modalId: string | ModalType) => {
        set(produce((draft: ModalStoreState) => {
            draft.modals.delete(modalId);
        }))
    },
    getAllModalsArray: () => {
        return Array.from(get().modals.values()) as ModalEntity[];
    },
    getModal: (modalId: string | ModalType) => {
        return get().modals.get(modalId) as ModalEntity;
    },
    setHasHydrated: (state: boolean) => {
        set(produce((draft: ModalStoreState) => {
            draft._hasHydrated = state;
        }));
    }
}), modalStorePersisConfig));

export default useModalStore;