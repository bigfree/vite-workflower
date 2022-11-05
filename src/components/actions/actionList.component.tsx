import {Alert, Box, Button, Modal, ModalClose, Stack, Typography} from "@mui/joy";
import {FC, Fragment, useState} from "react";
import Draggable from "react-draggable";
import useActionStore, {ActionEntity} from "../../store/action.store";
import useModalStore, {ModalType} from "../../store/modal.store";

const ActionListComponent: FC = (): JSX.Element => {
    const {getAllActions} = useActionStore();
    const {setModal} = useModalStore();

    return (
        <Fragment>
            <Box
                sx={{
                    padding: 2,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 'auto',
                    overflow: 'auto',
                }}
            >
                {getAllActions().length ? (
                    <Stack
                        direction={'column'}
                    >
                        {getAllActions().map((action: ActionEntity) => (
                            <div key={action.id}>{action.name}</div>
                        ))}
                    </Stack>
                ) : (
                    <Alert
                        variant="outlined"
                        color="neutral"
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                mb: 1,
                                fontSize: 30
                            }}
                        >
                            😥
                        </Typography>
                        <Typography
                            level={'h5'}
                            sx={{
                                mb: 1.5
                            }}
                        >
                            Actions is empty
                        </Typography>
                        <Button
                            variant={'plain'}
                            onClick={() => setModal({
                                id: ModalType.ACTION_NEW,
                                open: true,
                            })}
                        >
                            Add new action
                        </Button>
                    </Alert>
                )}
            </Box>
            {/*<Modal*/}
            {/*    open={open}*/}
            {/*    onClose={() => setOpen(false)}*/}
            {/*    hideBackdrop={true}*/}
            {/*    disableEnforceFocus*/}
            {/*    sx={{*/}
            {/*        width: 400,*/}
            {/*        height: 'auto',*/}
            {/*        bottom: 'auto',*/}
            {/*        right: 'auto',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Box>*/}
            {/*        <ModalClose*/}
            {/*            variant="outlined"*/}
            {/*            sx={{*/}
            {/*                top: 'calc(-1/4 * var(--IconButton-size))',*/}
            {/*                right: 'calc(-1/4 * var(--IconButton-size))',*/}
            {/*                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',*/}
            {/*                borderRadius: '50%',*/}
            {/*                bgcolor: 'background.body',*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae delectus doloribus eius error*/}
            {/*        facilis iusto magni nam officiis quam quibusdam, quo repellat repellendus saepe sed sequi sunt totam*/}
            {/*        veritatis! Mollitia.*/}
            {/*    </Box>*/}
            {/*</Modal>*/}

            {/*<Draggable*/}
            {/*    handle="strong"*/}
            {/*    onDrag={(event, data) => console.log(event, data)}*/}
            {/*>*/}
            {/*    <Modal*/}
            {/*        open={open}*/}
            {/*        onClose={() => setOpen(false)}*/}
            {/*        hideBackdrop={true}*/}
            {/*        disableEnforceFocus*/}
            {/*        sx={{*/}
            {/*            width: 400,*/}
            {/*            height: 'auto',*/}
            {/*            top: 150,*/}
            {/*            bottom: 'auto',*/}
            {/*            right: 'auto',*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Box>*/}
            {/*            <ModalClose*/}
            {/*                variant="outlined"*/}
            {/*                sx={{*/}
            {/*                    top: 'calc(-1/4 * var(--IconButton-size))',*/}
            {/*                    right: 'calc(-1/4 * var(--IconButton-size))',*/}
            {/*                    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',*/}
            {/*                    borderRadius: '50%',*/}
            {/*                    bgcolor: 'background.body',*/}
            {/*                }}*/}
            {/*            />*/}
            {/*            <strong className="cursor"><div>Drag here</div></strong>*/}
            {/*            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae delectus doloribus eius error*/}
            {/*            facilis iusto magni nam officiis quam quibusdam, quo repellat repellendus saepe sed sequi sunt*/}
            {/*            totam*/}
            {/*            veritatis! Mollitia.*/}
            {/*        </Box>*/}
            {/*    </Modal>*/}
            {/*</Draggable>*/}
        </Fragment>
    )
}
export default ActionListComponent;