import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import {PersistConfig} from "redux-persist/es/types";

const VERSION = 1;

type RootPersistConfig = PersistConfig<any> & { deserialize: boolean };

export const rootPersistConfig: RootPersistConfig = {
    key: 'root',
    version: VERSION,
    storage: createIdbStorage({
        name: 'workflower',
        storeName: 'playground',
        version: VERSION
    }),
    timeout: 0,
    serialize: false,
    deserialize: false,
    debug: true,
    // stateReconciler: (state: RootState) => state,
    stateReconciler: hardSet,
}