import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {IconButton, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useModalStore, {ModalEntity, ModalStoreState, ModalType} from "../../../store/modal.store";
import FormActionComponent from "../../actions/form/formAction.component";
import {ModalBodyComponent, ModalComponent, ModalHeaderComponent} from "../modal.component";

/**
 * NewActionModalComponent Props
 */
type NewActionModalComponentProps = ModalEntity;

/**
 * SetModal Selector
 * @param state
 */
const setModalSelector = (state: ModalStoreState) => state.setModal;

const NewActionModalComponent: FC<NewActionModalComponentProps> = (modal): JSX.Element => {
    const setModal = useModalStore(setModalSelector);

    return (
        <Fragment>
            <ModalComponent modal={modal}>
                <ModalHeaderComponent>
                    <Typography
                        level={'h5'}
                        sx={{
                            mr: 'auto',
                            zIndex: 999,
                        }}
                    >
                        ‍🚀 Create new action
                    </Typography>
                    <IconButton
                        variant={'plain'}
                        color={'neutral'}
                        sx={{
                            position: 'relative'
                        }}
                        onClick={() => setModal({
                            id: modal.id,
                            type: ModalType.ACTION_NEW,
                            open: false,
                        })}
                    >
                        <CloseOutlinedIcon/>
                    </IconButton>
                </ModalHeaderComponent>
                <ModalBodyComponent>
                    <FormActionComponent/>
                </ModalBodyComponent>
            </ModalComponent>
        </Fragment>
    )
}
export default NewActionModalComponent;