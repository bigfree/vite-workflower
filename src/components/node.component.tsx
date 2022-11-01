import {nanoid} from "nanoid";
import {FC} from "react";
import {useDrag} from "react-dnd";
import useFlowStore from "../store/flow.store";
import {ItemTypes} from "../types/item.types";

type DropResult = {
    name: string;
}

const NodeComponent: FC = (): JSX.Element => {
    const {addSingleNode} = useFlowStore();
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.NODE,
        item: {name: 'node'},
        end: (item, monitor) => {
            const dropResult: DropResult | null = monitor.getDropResult<DropResult>();
            const coord = monitor.getSourceClientOffset();
            if (item && dropResult) {
                console.log(coord)
                addSingleNode({
                    id: nanoid(),
                    position: {
                        x: coord?.x ?? 0,
                        y: coord?.y ?? 0,
                    },
                    data: {
                        nodeDataProp: 'testData',
                        label: 'test DND'
                    }
                });
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