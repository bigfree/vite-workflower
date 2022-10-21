import {FC, useCallback} from "react";
import {personAddOne, personRemoveMany, personRemoveOne, selectAll} from "../store/playground/playgroundSlice";
import {connect, ConnectedProps} from "react-redux";
import {nanoid} from "nanoid";
import {RootState} from "../store/store";

const connector = connect((state: RootState) => ({
    selectAll: selectAll(state),
}), {
    personAddOne,
    personRemoveOne,
    personRemoveMany,
});

const TestComponent: FC<ConnectedProps<typeof connector>> = (props): JSX.Element => {
    const {selectAll, personAddOne, personRemoveMany} = props;

    const addOnePersonCallback = useCallback(() => {
        const id: string = nanoid();
        personAddOne({
            id,
            name: `Person name - ${id}`,
        });
    }, [selectAll]);

    const clearAllPersonCallback = useCallback(() => {
        personRemoveMany()
    }, []);

    return (
        <div>
            <button onClick={addOnePersonCallback}>Generate random name</button>
            <button onClick={clearAllPersonCallback}>Clear all name</button>
            {/*<button onClick={() => restoreState()}>Restore state</button>*/}
            <hr/>
            {JSON.stringify(selectAll)}
        </div>
    )
}

export default connector(TestComponent);