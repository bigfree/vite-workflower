import {createEntityAdapter, createSlice, EntityAdapter} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type Person = {
    id: string;
    name: string;
}

/**
 * Person Adapter
 */
const personAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
    selectId: (person: Person) => person.id,
});

/**
 * Playground Slice
 */
export const playgroundSlice = createSlice({
    name: 'playground',
    initialState: personAdapter.getInitialState(),
    reducers: {
        personAddOne: personAdapter.addOne,
        personRemoveOne: personAdapter.removeOne,
        personRemoveMany: personAdapter.removeAll,
    }
});

/**
 * Actions
 */
export const {
    personAddOne,
    personRemoveOne,
    personRemoveMany
} = playgroundSlice.actions;

/**
 * Selectors
 */
export const {
    selectAll
} = personAdapter.getSelectors<RootState>((state: RootState) => state.playground);

/**
 * Reducer
 */
export default playgroundSlice.reducer;