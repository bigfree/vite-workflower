import {Box, Modal, ModalClose} from "@mui/joy";
import {FC, Fragment} from "react";
import Draggable from "react-draggable";
import useModalStore, {ModalType} from "../../../store/modal.store";

type NewActionModalComponentProps = {
    id: string | ModalType;
}

const NewActionModalComponent: FC<NewActionModalComponentProps> = ({id}): JSX.Element => {
    const {deleteModal, setModal} = useModalStore();

    return (
        <Fragment>
            <Draggable
                handle="strong"
                onDrag={(event, data) => console.log(event, data)}
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