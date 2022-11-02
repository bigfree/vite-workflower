import {nanoid} from "nanoid";
import {FC} from "react";
import {useDrag} from "react-dnd";
import {NodeEntity} from "../store/flow.store";
import {DropResult, ItemTypes} from "../types/item.types";

// export type DropResult = {
//     name: string;
//     dropEffect: string;
// }

const NodeComponent: FC = (): JSX.Element => {
    const [{isDragging}, drag] = useDrag<NodeEntity, DropResult, { isDragging: boolean }>(() => ({
        type: ItemTypes.NODE,
        item: {
            id: nanoid(),
            type: 'customNode',
            position: {
                x: 0,
                y: 0
            },
            data: {
                nodeDataProp: 'testData',
                label: 'test DND'
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId,
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                width: '50px',
                height: '30px',
                border: isDragging ? '1px solid red' : '1px solid black',
                cursor: 'move',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            Node
        </div>
    )
}
export default NodeComponent;