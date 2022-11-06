import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Box, IconButton, Modal, Stack, Typography} from "@mui/joy";
import {FC, Fragment, useEffect, useRef} from "react";
import Draggable, {DraggableData} from "react-draggable";
import useFlowStore from "../../../store/flow.store";
import useModalStore, {ModalEntity} from "../../../store/modal.store";

type NodeModalComponentProps = ModalEntity;

const NodeModalComponent: FC<NodeModalComponentProps> = ({id, open, positions}): JSX.Element => {
    const nodeRef = useRef(null);
    const node = useFlowStore((state) => state.getNode(id));
    const {setModal} = useModalStore();

    return (
        <Fragment>
            <Draggable
                handle={'.modalHeader'}
                bounds={'body'}
                nodeRef={nodeRef}
                onStop={(event, data: DraggableData) => setModal({
                    id,
                    open,
                    positions: {
                        x: data.x,
                        y: data.y
                    }
                })}
                position={positions}
            >
                <Modal
                    open={true}
                    hideBackdrop={true}
                    disableEnforceFocus
                    sx={{
                        width: 500,
                        height: 'auto',
                        top: 0,
                        left: 0,
                        bottom: 'auto',
                        right: 'auto',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(20px)',
                        border: 2,
                        borderColor: 'neutral.200'
                    }}
                    ref={nodeRef}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            position: 'relative',
                        }}
                    >
                        <Stack
                            direction={'row'}
                            sx={{
                                backgroundColor: '#fff',
                                borderBottom: 1,
                                borderBottomColor: 'neutral.50',
                                cursor: 'move',
                                alignItems: 'center',
                                padding: 1,
                            }}
                            className='modalHeader'
                        >
                            <Typography
                                level={'h5'}
                                sx={{
                                    mr: 'auto',
                                    zIndex: 999,
                                }}
                            >
                                {node.id}
                            </Typography>
                            <IconButton
                                variant={'plain'}
                                color={'neutral'}
                                sx={{
                                    position: 'relative'
                                }}
                                onClick={() => setModal({
                                    id,
                                    open: false,
                                })}
                            >
                                <CloseOutlinedIcon/>
                            </IconButton>
                        </Stack>
                        <Box
                            sx={{
                                padding: 1
                            }}
                        >
                            {JSON.stringify(node)}
                        </Box>
                    </Box>
                </Modal>
            </Draggable>
        </Fragment>
    )
}
export default NodeModalComponent;