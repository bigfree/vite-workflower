import {FC} from 'react'
import useNameStore, {NameEntity, NameEntityId} from './store/nameStore'

const App: FC = (): JSX.Element => {
    const namesFromStore: Map<NameEntityId, NameEntity> = useNameStore.useNames();
    const addNameToName = useNameStore.useAddName();

    const handleOnClickAdd = () => {
        addNameToName({
                id: `ID-${(Math.floor(Math.random() * (100)))}`,
                name: 'text'
            }
        );
    }

    return (
        <div>
            <button onClick={handleOnClickAdd}>Add name to Names</button>
            <hr/>
            <p>
                {JSON.stringify(Array.from(namesFromStore.values()))}
            </p>
        </div>
    )
};

export default App
