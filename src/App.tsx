import '@fontsource/public-sans';
import {CssBaseline} from "@mui/joy";
import {FC, Fragment} from 'react'
import 'reactflow/dist/base.css';
import ActionAsideComponent from "./components/actions/actionAside.component";
import AsideComponent from "./components/aside.component";
import FlowComponent from "./components/flow.component";
import useAppStore from "./store/app.store";

const App: FC = (): JSX.Element => {
    const {openActions} = useAppStore();

    return (
        <Fragment>
            <CssBaseline/>
            <div style={{
                display: 'flex',
                flexFlow: 'row',
                position: 'relative',
            }}>
                <FlowComponent/>
                {openActions ? <ActionAsideComponent/> : ''}
                <AsideComponent/>
            </div>
        </Fragment>
    )
};

export default App