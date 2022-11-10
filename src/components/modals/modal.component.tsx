import {Box, Modal, Stack} from "@mui/joy";
import {FC, Fragment, MutableRefObject, useCallback, useRef} from "react";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import useModalStore, {ModalEntity, ModalStoreState} from "../../store/modal.store";

type ModalChildren =
    | JSX.Element
    | JSX.Element[]
    | string
    | string[]

type ModalComponentProps = {
    modal: ModalEntity;
    children: ModalChildren
}

type ModalHeaderComponentProps = {
    children: ModalChildren
}

type ModalBodyComponentProps = {
    children: ModalChildren
}

/**
 * SetModal Selector
 * @param store
 */
const setModalSelector = (store: ModalStoreState) => store.setModal;

/**
 * Modal Body component
 * @param children
 * @constructor
 */
export const ModalBodyComponent: FC<ModalBodyComponentProps> = ({children}): JSX.Element => {
    return (
        <Fragment>
            <Box
                sx={{
                    padding: 2,
                    position: 'relative',
                    zIndex: 999,
                }}
            >
                {children}
            </Box>
        </Fragment>
    )
}

/**
 * Modal Header component
 * @param children
 * @constructor
 */
export const ModalHeaderComponent: FC<ModalHeaderComponentProps> = ({children}): JSX.Element => {
    return (
        <Fragment>
            <Box className={'modalHeader'}>
                <Stack
                    direction={'row'}
                    sx={{
                        backgroundColor: '#fff',
                        borderBottom: 1,
                        borderBottomColor: 'neutral.50',
                        cursor: 'move',
                        alignItems: 'center',
                        py: 1,
                        px: 2,
                    }}
                    className='modalHeader'
                >
                    {children}
                </Stack>
            </Box>
        </Fragment>
    )
}

/**
 * Modal component
 * @param modal
 * @param children
 * @constructor
 */
export const ModalComponent: FC<ModalComponentProps> = ({modal, children}): JSX.Element => {
    const nodeRef: MutableRefObject<null> = useRef(null);
    const setModal = useModalStore(setModalSelector);

    /** Draggable onStop event */
    const handleOnStop = useCallback((event: DraggableEvent, data: DraggableData) => {
        setModal({
            ...modal,
            positions: {
                x: data.x,
                y: data.y
            }
        })
    }, [modal]);

    return (
        <Fragment>
            <Draggable
                handle={'.modalHeader'}
                bounds={'body'}
                nodeRef={nodeRef}
                onStop={handleOnStop}
                position={modal.positions}
            >
                <Modal
                    ref={nodeRef}
                    open={true}
                    hideBackdrop={true}
                    disableEnforceFocus
                    sx={{
                        width: 600,
                        height: 'auto',
                        top: 0,
                        left: 0,
                        bottom: 'auto',
                        right: 'auto',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(15px)',
                        border: 2,
                        borderColor: 'neutral.200',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            position: 'relative',
                            '&:focus-visible': {
                                outline: 'none'
                            }
                        }}
                    >
                        {children}
                    </Box>
                </Modal>
            </Draggable>
        </Fragment>
    )
}