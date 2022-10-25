// import create from "zustand";
// import {temporal} from "zundo";
//
// type PersonValues = {
//     name: string;
// }
//
// type PersonActions = {
//     setName: (name: string) => void;
//     clearName: () => void;
// }
//
// // export interface PersonState {
// //     name: string;
// //     setName: (name: string) => void;
// //     clearName: () => void;
// // }
//
// export type PersonState = PersonValues & PersonActions;
// // export type PersonStateWithTemporal = PersonState & Partial<UndoState>
//
// // export const usePersonStore = create<PersonState>()(
// //     devtools(
// //         temporal(
// //             immer((set) => ({
// //                 name: '',
// //                 setName: (name: string) => {
// //                     set((state) => {
// //                         state.name = name
// //                     }, false, 'person/setName');
// //                 },
// //                 clearName: () => {
// //                     set((state) => {
// //                         state.name = ''
// //                     }, false, 'person/clearName');
// //                 },
// //             }))
// //         )
// //     )
// // );
//
// // export const useTemporalPersonStore = create(usePersonStore.)
//
// export const usePersonStore = create(
//     temporal<PersonState>(
//         (set) => ({
//             name: '',
//             setName: (name: string) => {
//                 set((state) => {
//                     state.name = name
//                 }, false, 'person/setName');
//             },
//             clearName: () => {
//                 set((state) => {
//                     state.name = ''
//                 }, false, 'person/clearName');
//             },
//         }), {
//             limit: 100
//         }
//     )
// )
