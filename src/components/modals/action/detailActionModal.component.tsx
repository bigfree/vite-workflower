import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Box, IconButton, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useActionStore, {ActionStoreState} from "../../../store/action.store";
import useModalStore, {ModalEntity, ModalStoreState, ModalType} from "../../../store/modal.store";
import {ActionEntity} from "../../../types/action.types";
import FormActionComponent from "../../actions/form/formAction.component";
import ActionIconByTypeComponent from "../../shared/actionIconByType.component";
import {ModalBodyComponent, ModalComponent, ModalHeaderComponent} from "../modal.component";

type DetailActionModalComponentProps = ModalEntity;

const DetailActionModalComponent: FC<DetailActionModalComponentProps> = (modal): JSX.Element => {
    const setModal = useModalStore((state: ModalStoreState) => state.setModal);
    const action: ActionEntity | undefined = useActionStore((state: ActionStoreState) => state.getAction(modal.id));

    return (
        <Fragment>
            <ModalComponent modal={modal}>
                <ModalHeaderComponent>
                    <Box
                        sx={{
                            mr: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <ActionIconByTypeComponent type={action?.type} sx={{
                            fontSize: 23
                        }}/>
                    </Box>
                    <Typography
                        level={'h5'}
                        sx={{
                            mr: 'auto',
                            zIndex: 999,
                        }}
                    >
                        {action?.name}
                    </Typography>
                    <IconButton
                        variant={'plain'}
                        color={'neutral'}
                        sx={{
                            position: 'relative'
                        }}
                        onClick={() => setModal({
                            id: modal.id,
                            type: ModalType.ACTION_EDIT,
                            open: false,
                        })}
                    >
                        <CloseOutlinedIcon/>
                    </IconButton>
                </ModalHeaderComponent>
                <ModalBodyComponent>
                    <FormActionComponent action={action}/>
                </ModalBodyComponent>
            </ModalComponent>
        </Fragment>
    )
}
export default DetailActionModalComponent;