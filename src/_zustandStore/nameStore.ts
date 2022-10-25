// import create from "zustand";
// import {devtools, persist} from "zustand/middleware";
// import {createSelectorHooks, ZustandHookSelectors} from "auto-zustand-selectors-hook";
// import {storage} from "./helpers/createStorage";
//
// export type NameEntityId = string;
//
// export type NameEntity = {
//     id: string
//     name: string
// }
//
// type NameState = {
//     names: Map<NameEntityId, NameEntity>;
//     addName: (name: NameEntity) => void;
//     getNames: () => NameEntity[];
// }
//
// const middlewares = (f) => devtools(
//     persist(f, {
//             name: 'nameStore',
//             version: 1,
//             getStorage: () => storage,
//             serialize: (data) => {
//                 return JSON.stringify({
//                     ...data,
//                     state: {
//                         ...data.state,
//                         names: Array.from(data.state.names as Map<NameEntityId, NameEntity>),
//                     },
//                 });
//             },
//             deserialize: (value) => {
//                 const data = JSON.parse(value);
//                 data.state.names = new Map(data.state.names);
//                 return data;
//             }
//         }
//     ), {
//         serialize: true
//     });
//
// const useNameStore = create<NameState>()(
//     middlewares((set, get): NameState => ({
//         names: new Map<NameEntityId, NameEntity>([]),
//         addName: (name: NameEntity) => set((state: NameState) => {
//             return {
//                 names: new Map(state.names).set(name.id, name)
//             }
//         }, false, 'name/addName'),
//         getNames: () => {
//             return Array.from(get().names.values()) as NameEntity[];
//         }
//     }))
// );
//
// export default createSelectorHooks(useNameStore) as typeof useNameStore & ZustandHookSelectors<NameState>;