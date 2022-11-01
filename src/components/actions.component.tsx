import {FC, Fragment, DragEvent, useCallback, memo} from "react";
import NodeComponent from "./node.component";

/**
 * Actions component
 * @constructor
 */
const ActionsComponent: FC = (): JSX.Element => {
    // const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, nodeType: string) => {
    //     console.log(event, nodeType)
    //     event.dataTransfer.setData('application/reactflow', nodeType);
    //     event.dataTransfer.effectAllowed = 'move';
    // }, []);

    return (
        <Fragment>
            <div style={{
                padding: '10px',
                borderLeft: '1px solid #e4e4e4'
            }}>
                <NodeComponent/>
            </div>
        </Fragment>
    )
}
export default memo(ActionsComponent);