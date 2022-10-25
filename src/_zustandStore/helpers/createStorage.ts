// import {StateStorage} from "zustand/middleware";
// import {del, get, set} from "idb-keyval";
//
// export const storage: StateStorage = {
//     getItem: async (name: string): Promise<string | null> => {
//         return JSON.stringify(await get(name)) || null;
//     },
//     setItem: async (name: string, value: string): Promise<void> => {
//         await set(name, JSON.parse(value));
//     },
//     removeItem: async (name: string): Promise<void> => {
//         await del(name);
//     },
// }