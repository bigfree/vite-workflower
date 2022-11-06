import {Box, Modal, ModalClose} from "@mui/joy";
import {FC, Fragment, useRef} from "react";
import Draggable, {DraggableData} from "react-draggable";
import useModalStore, {ModalEntity, ModalType} from "../../../store/modal.store";

type NewActionModalComponentProps = ModalEntity;

const NewActionModalComponent: FC<NewActionModalComponentProps> = ({id, open, positions}): JSX.Element => {
    const nodeRef = useRef(null);
    const {deleteModal, setModal} = useModalStore();

    return (
        <Fragment>
            <Draggable
                handle="strong"
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
                    onClose={() => setModal({
                        id,
                        open: false,
                    })}
                    hideBackdrop={true}
                    disableEnforceFocus
                    sx={{
                        width: 400,
                        height: 'auto',
                        top: 0,
                        left: 0,
                        bottom: 'auto',
                        right: 'auto',
                    }}
                    ref={nodeRef}
                >
                    <Box>
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                            }}
                        />
                        <strong className="cursor"><div>Drag here</div></strong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae delectus doloribus eius error
                        facilis iusto magni nam officiis quam quibusdam, quo repellat repellendus saepe sed sequi sunt
                        totam
                        veritatis! Mollitia.
                    </Box>
                </Modal>
            </Draggable>
        </Fragment>
    )
}
export default NewActionModalComponent;