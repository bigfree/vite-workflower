import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {IconButton, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useFlowStore, {FlowStoreState, NodeEntity} from "../../../store/flow.store";
import useModalStore, {ModalEntity, ModalStoreState, ModalType} from "../../../store/modal.store";
import {ModalBodyComponent, ModalComponent, ModalHeaderComponent} from "../modal.component";
import DataNodeContainerComponent from "./dataNodeContainer.component";

/**
 * NodeModalComponent Props
 */
type NodeModalComponentProps = ModalEntity;

/**
 * SetModal Selector
 * @param state
 */
const setModalSelector = (state: ModalStoreState) => state.setModal;

/**
 * NodeModal Component
 * @param modal
 * @constructor
 */
const DetailNodeModalComponent: FC<NodeModalComponentProps> = (modal): JSX.Element => {
    const node: NodeEntity = useFlowStore((state: FlowStoreState) => state.getNode(modal.id));
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
                        {node.id}
                    </Typography>
                    <IconButton
                        variant={'plain'}
                        color={'neutral'}
                        sx={{
                            position: 'relative'
                        }}
                        onClick={() => setModal({
                            id: modal.id,
                            type: ModalType.NODE_EDIT,
                            open: false,
                        })}
                    >
                        <CloseOutlinedIcon/>
                    </IconButton>
                </ModalHeaderComponent>
                <ModalBodyComponent>
                    <DataNodeContainerComponent/>
                    {JSON.stringify(node)}
                </ModalBodyComponent>
            </ModalComponent>
        </Fragment>
    );
}
export default DetailNodeModalComponent;