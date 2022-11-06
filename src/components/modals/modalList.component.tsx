import {FC, Fragment} from "react";
import useModalStore, {ModalEntity, ModalType} from "../../store/modal.store";
import NewActionModalComponent from "./action/newActionModal.component";
import NodeModalComponent from "./node/nodeModal.component";

const ModalListComponent: FC = (): JSX.Element => {
    const {getAllModalsArray} = useModalStore();
    return (
        <Fragment>
            {getAllModalsArray().map((modal: ModalEntity) => {
                if (modal.open && ModalType.ACTION_NEW === modal.id) {
                    return <NewActionModalComponent key={modal.id} {...modal}/>
                } else if (modal.open && '' !== modal.id) {
                    return <NodeModalComponent key={modal.id} {...modal}/>
                }
            })}
        </Fragment>
    )
}
export default ModalListComponent;