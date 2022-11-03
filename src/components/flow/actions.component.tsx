import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import {Box, Divider, IconButton, Stack} from "@mui/material";
import {FC, Fragment} from "react";
import {useReactFlow} from "reactflow";
import useAppStore from "../../store/app.store";
import useFlowStore from "../../store/flow.store";

/**
 * Actions Flow Component
 * @constructor
 */
const ActionsComponent: FC = (): JSX.Element => {
    const {edgeMode, toggleEdgeMode} = useAppStore();
    const {zoomIn, zoomOut, zoomTo} = useReactFlow();
    const {clearStorage} = useFlowStore.persist;

    return (
        <Fragment>
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                mb: 1.5,
                ml: 1.5,
                py: 1.5,
                px: 2,
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: 3,
                border: 1,
                borderColor: '#E7EBF0',
                zIndex: 999,
                backdropFilter: 'blur(20px)',
            }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="stretch"
                    spacing={1}
                >
                    <IconButton
                        title={`Turn ${edgeMode ? 'off' : 'on'} edge mode`}
                        sx={{
                            border: 1,
                            borderColor: '#E7EBF0',
                            backgroundColor: 'rgba(255,255,255,.7)',
                            borderRadius: 3
                        }}
                        onClick={toggleEdgeMode}
                    >
                        {edgeMode ? <EditOffOutlinedIcon/> : <ModeOutlinedIcon/>}
                    </IconButton>
                    <Divider orientation={'vertical'} flexItem />
                    <IconButton
                        title="Zoom In"
                        sx={{
                            border: 1,
                            borderColor: '#E7EBF0',
                            backgroundColor: 'rgba(255,255,255,.7)',
                            borderRadius: 3
                        }}
                        onClick={() => zoomIn({duration: 200})}
                    >
                        <AddOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        title="Zoom Out"
                        sx={{
                            border: 1,
                            borderColor: '#E7EBF0',
                            backgroundColor: 'rgba(255,255,255,.7)',
                            borderRadius: 3
                        }}
                        onClick={() => zoomOut({duration: 200})}
                    >
                        <RemoveOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        title="Zoom Out"
                        sx={{
                            border: 1,
                            borderColor: '#E7EBF0',
                            backgroundColor: 'rgba(255,255,255,.7)',
                            borderRadius: 3
                        }}
                        onClick={() => zoomTo(1, {duration: 200})}
                    >
                        <CenterFocusStrongOutlinedIcon/>
                    </IconButton>
                </Stack>
                {/*<button onClick={clearStorage}>Clear store</button>*/}
            </Box>
        </Fragment>
    )
}
export default ActionsComponent;