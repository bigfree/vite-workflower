import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {IconButton, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useModalStore, {ModalEntity} from "../../../store/modal.store";
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
                        Create new action
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores in perspiciatis quod! Cum maxime
                    molestiae quaerat quod? Aperiam, cum dicta earum fugiat hic necessitatibus nesciunt nihil nobis
                    sapiente
                    vero voluptas.
                </ModalBodyComponent>
            </ModalComponent>
        </Fragment>
    )
}
export default NewActionModalComponent;