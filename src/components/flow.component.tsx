import {nanoid} from "nanoid";
import {FC, useCallback, useRef} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {Background, BackgroundVariant, ReactFlow, useReactFlow, XYPosition} from "reactflow";
import useFlowStore, {NodeEntity} from "../store/flow.store";
import {ItemTypes} from "../types/item.types";

/**
 * Flow component
 * @constructor
 */
const FlowComponent: FC = (): JSX.Element => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const {project} = useReactFlow();
    const {getAllEdges, getAllNodes, addSingleNode, onNodesChange, onEdgesChange, onConnect} = useFlowStore();
    const {clearStorage} = useFlowStore.persist;
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.NODE,
        drop: (item: NodeEntity, monitor) => {
            if (!monitor.canDrop() || null === reactFlowWrapper.current) {
                return;
            }

            const reactFlowBounds: DOMRect = reactFlowWrapper.current.getBoundingClientRect();
            const position: XYCoord | null = monitor.getSourceClientOffset();
            const flowPosition: XYPosition = project({
                x: (position?.x ?? 0) - reactFlowBounds.left,
                y: (position?.y ?? 0) - reactFlowBounds.top,
            });

            addSingleNode({
                ...item,
                id: nanoid(),
                position: flowPosition
            });

            return {
                name: 'flow'
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [project]);

    const onClickAddNode = useCallback(() => {
        addSingleNode({
            id: nanoid(),
            position: {
                x: 100,
                y: 200
            },
            data: {
                nodeDataProp: 'testData',
                label: 'test'
            }
        });
    }, [getAllNodes]);

    // const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    //     event.preventDefault();
    //     event.dataTransfer.dropEffect = 'move';
    // }, []);
    //
    // // @TODO
    // const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    //     event.preventDefault();
    //
    //     if (null === reactFlowWrapper.current) {
    //         return;
    //     }
    //
    //     const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    //     const type: string = event.dataTransfer.getData('application/reactflow');
    //     console.log(reactFlowBounds, type);
    //
    //     if (typeof type === 'undefined' || !type) {
    //         return;
    //     }
    //
    //     const position: XYPosition = reactFlowInstance.project({
    //         x: event.clientX - reactFlowBounds.left,
    //         y: event.clientY - reactFlowBounds.top,
    //     });
    //
    //     addSingleNode({
    //         id: nanoid(),
    //         type,
    //         position,
    //         data: {
    //             nodeDataProp: 'testData',
    //             label: 'test DND'
    //         }
    //     });
    //
    // }, [reactFlowInstance]);

    return (
        <div style={{width: '100%', minHeight: '100vh', position: 'relative'}}>
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 99999}}>
                <button onClick={onClickAddNode}>Add node</button>
                <button onClick={clearStorage}>Clear store</button>
            </div>
            <div style={{width: '100%', height: '100vh'}} ref={reactFlowWrapper}>
                <ReactFlow
                    ref={drop}
                    nodes={getAllNodes()}
                    edges={getAllEdges()}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    // onDrop={onDrop}
                    // onDragOver={onDragOver}
                    snapToGrid={true}
                    snapGrid={[5, 5]}
                    minZoom={1}
                    maxZoom={1}
                >
                    <Background
                        gap={20}
                        variant={BackgroundVariant.Lines}
                        // style={{backgroundColor: '#232323'}}
                        // color={'#323232'}
                        // lineWidth={0.5}
                    />
                </ReactFlow>
            </div>
            <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>{JSON.stringify(getAllNodes())}</div>
            {/*<ReactFlow*/}
            {/*    node={}*/}
            {/*/>*/}
        </div>
    )
}
export default FlowComponent;