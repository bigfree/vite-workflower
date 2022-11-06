import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {IconButton, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useModalStore, {ModalEntity} from "../../../store/modal.store";
import NewActionComponent from "../../actions/newAction/newAction.component";
import {ModalBodyComponent, ModalComponent, ModalHeaderComponent} from "../modal.component";

type NewActionModalComponentProps = ModalEntity;

const NewActionModalComponent: FC<NewActionModalComponentProps> = (modal): JSX.Element => {
    const {setModal} = useModalStore();

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
                            open: false,
                        })}
                    >
                        <CloseOutlinedIcon/>
                    </IconButton>
                </ModalHeaderComponent>
                <ModalBodyComponent>
                    <NewActionComponent/>
                </ModalBodyComponent>
            </ModalComponent>
        </Fragment>
    )
}
export default NewActionModalComponent;