import {FC, Fragment} from 'react'
import FlowComponent from "./components/flow.component";
import 'reactflow/dist/base.css';

const App: FC = (): JSX.Element => {

    return (
        <Fragment>
            <FlowComponent/>
        </Fragment>
    )
};

export default App
