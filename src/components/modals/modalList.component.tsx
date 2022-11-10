import {FC, Fragment} from "react";
import useModalStore, {ModalEntity, ModalType} from "../../store/modal.store";
import DetailActionModalComponent from "./action/detailActionModal.component";
import NewActionModalComponent from "./action/newActionModal.component";
import DetailNodeModalComponent from "./node/detailNodeModal.component";

/**
 * ModalList component
 * @constructor
 */
const ModalListComponent: FC = (): JSX.Element => {
    const {getAllModalsArray} = useModalStore();
    return (
        <Fragment>
            {getAllModalsArray().map((modal: ModalEntity, index) => {
                if (modal.open && ModalType.ACTION_NEW === modal.type) {
                    return <NewActionModalComponent key={index} {...modal}/>
                } else if (modal.open && ModalType.ACTION_EDIT === modal.type) {
                    return <DetailActionModalComponent key={index} {...modal}/>
                } else if (modal.open && ModalType.NODE_EDIT === modal.type && '' !== modal.id) {
                    return <DetailNodeModalComponent key={index} {...modal}/>
                }
            })}
        </Fragment>
    )
}
export default ModalListComponent;