import '@fontsource/public-sans';
import {CssBaseline} from "@mui/joy";
import {FC, Fragment} from 'react'
import 'reactflow/dist/base.css';
import ActionsComponent from "./components/actions.component";
import FlowComponent from "./components/flow.component";

const App: FC = (): JSX.Element => {

    return (
        <Fragment>
            <CssBaseline/>
            <div style={{
                display: 'flex',
                flexFlow: 'row',
                position: 'relative',
            }}>
                <FlowComponent/>
                <ActionsComponent/>
            </div>
        </Fragment>
    )
};

export default App
