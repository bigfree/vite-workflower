import {FC, Fragment} from 'react'
import 'reactflow/dist/base.css';
import ActionsComponent from "./components/actions.component";
import FlowComponent from "./components/flow.component";

const App: FC = (): JSX.Element => {

    return (
        <Fragment>
            <div style={{
                display: 'flex',
                flexFlow: 'row',
            }}>
                <FlowComponent/>
                <ActionsComponent/>
            </div>
        </Fragment>
    )
};

export default App
