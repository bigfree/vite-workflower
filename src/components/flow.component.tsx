import {NodeTypes} from "@reactflow/core/dist/esm/types";
import {DefaultEdgeOptions} from "@reactflow/core/dist/esm/types/edges";
import {nanoid} from "nanoid";
import {CSSProperties, FC, useMemo, useRef} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {Background, BackgroundVariant, EdgeTypes, MarkerType, ReactFlow, useReactFlow, XYPosition} from "reactflow";
import useAppStore from "../store/app.store";
import useFlowStore, {NodeEntity} from "../store/flow.store";
import {ItemTypes} from "../types/item.types";
import CustomEdgeComponent from "./custom/customEdge.component";
import CustomLineComponent from "./custom/customLine.component";
import CustomNodeComponent from "./custom/customNode.component";
import ActionsComponent from "./flow/actions.component";

// const nodeTypes: NodeTypes = {
//     customNode: CustomNodeComponent
// }

// const edgeTypes: EdgeTypes = {
//     floating: CustomEdgeComponent,
// };

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: {strokeWidth: 1, stroke: 'black'},
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
};

const connectionLineStyle: CSSProperties = {
    strokeWidth: 1,
    stroke: 'black',
};

/**
 * Flow component
 * @constructor
 */
const FlowComponent: FC = (): JSX.Element => {
    const {getAllEdges, getAllNodes, addSingleNode, onNodesChange, onEdgesChange, onConnect} = useFlowStore();

    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const {project} = useReactFlow();

    const nodeTypes: NodeTypes = useMemo(() => ({ customNode: CustomNodeComponent }), []);
    const edgeTypes: EdgeTypes = useMemo(() => ({ floating: CustomEdgeComponent }), []);

    const [, drop] = useDrop(() => ({
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
    }), [project]);

    return (
        <div style={{width: '100%', minHeight: '100vh', position: 'relative'}}>
            <div style={{width: '100%', height: '100vh'}} ref={reactFlowWrapper}>
                <ActionsComponent/>
                <ReactFlow
                    ref={drop}
                    nodes={getAllNodes()}
                    edges={getAllEdges()}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    snapToGrid={true}
                    snapGrid={[5, 5]}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    defaultEdgeOptions={defaultEdgeOptions}
                    connectionLineComponent={CustomLineComponent}
                    connectionLineStyle={connectionLineStyle}
                >
                    <Background
                        gap={20}
                        variant={BackgroundVariant.Lines}
                        // style={{backgroundColor: '#232323'}}
                        color={'rgba(241,241,241,0.67)'}
                        // lineWidth={0.5}
                    />
                </ReactFlow>
            </div>
            {/*<div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>{JSON.stringify(getAllNodes())}</div>*/}
        </div>
    )
}
export default FlowComponent;