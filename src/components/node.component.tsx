import {nanoid} from "nanoid";
import {FC} from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../types/item.types";

export type DropResult = {
    name: string;
    dropEffect: string;
}

const NodeComponent: FC = (): JSX.Element => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: {
            id: nanoid(),
            data: {
                nodeDataProp: 'testData',
                label: 'test DND'
            }
        },
        // end: (item, monitor) => {
        //     // const dropResult: DropResult | null = monitor.getDropResult<DropResult>();
        //     // if (item && dropResult) {
        //     //     console.log('drop', item);
        //     // }
        //     // const dropResult: NodeEntity | null = monitor.getDropResult<NodeEntity>();
        //     // const coord = monitor.getSourceClientOffset();
        //     // console.log(monitor)
        //     // if (item && dropResult) {
        //     //     // console.log(coord)
        //     //     addSingleNode({
        //     //         id: nanoid(),
        //     //         position: {
        //     //             x: coord?.x ?? 0,
        //     //             y: coord?.y ?? 0,
        //     //         },
        //     //         data: {
        //     //             nodeDataProp: 'testData',
        //     //             label: 'test DND'
        //     //         }
        //     //     });
        //     // }
        // },
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