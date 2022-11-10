import {Alert, Box, Button, Modal, ModalClose, Stack, Typography} from "@mui/joy";
import {FC, Fragment, useState} from "react";
import Draggable from "react-draggable";
import useActionStore from "../../store/action.store";
import useModalStore, {ModalType} from "../../store/modal.store";
import {ActionEntity} from "../../types/action.types";
import ActionListDetailComponent from "./action/actionListDetail.component";
import SearchActionListDetailComponent from "./action/searchActionListDetail.component";

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
                    display: 'flex',
                    flexFlow: 'column',
                }}
            >
                {getAllActions().length ? (
                    <Fragment>
                        <SearchActionListDetailComponent/>
                        <Stack
                            direction={'column'}
                            sx={{
                                flex: '1 1 auto'
                            }}
                        >
                            {getAllActions().map((action: ActionEntity, index: number) => (
                                <ActionListDetailComponent key={index} action={action}/>
                            ))}
                        </Stack>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            onClick={() => setModal({
                                id: ModalType.ACTION_NEW,
                                type: ModalType.ACTION_NEW,
                                open: true,
                            })}
                        >
                            Add new action
                        </Button>
                    </Fragment>
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
                                type: ModalType.ACTION_NEW,
                                open: true,
                            })}
                        >
                            Add new action
                        </Button>
                    </Alert>
                )}
            </Box>
        </Fragment>
    )
}
export default ActionListComponent;