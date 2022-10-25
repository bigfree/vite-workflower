import {nanoid} from "nanoid";
import {FC, useCallback} from "react";
import {applyNodeChanges, Background, NodeChange, ReactFlow} from "reactflow";
import useFlowStore from "../store/flow.store";

/**
 * Flow component
 * @constructor
 */
const FlowComponent: FC = (): JSX.Element => {
    const {getAllEdge, getAllNode, addSingleNode, addSingleEdge, onNodesAddChange} = useFlowStore();

    const onClickAddNode = useCallback(() => {
        addSingleNode({
            id: nanoid(),
            type: 'input',
            position: {
                x: 100,
                y: 200
            },
            data: {
                nodeDataProp: 'testData',
                label: 'test'
            }
        });
    }, [getAllNode]);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        onNodesAddChange(applyNodeChanges(changes, getAllNode()));
    }, []);

    return (
        <div style={{width: '100%', minHeight: '100vh', position: 'relative'}}>
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 99999}}>
                <button onClick={onClickAddNode}>Add node</button>
            </div>
            <div style={{width: '100%', height: '100vh'}}>
                <ReactFlow
                    nodes={getAllNode()}
                    edges={getAllEdge()}
                    onNodesChange={onNodesChange}
                    snapToGrid={true}
                >
                    <Background
                        gap={10}
                    />
                </ReactFlow>
            </div>
            <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>{JSON.stringify(getAllNode())}</div>
            {/*<ReactFlow*/}
            {/*    node={}*/}
            {/*/>*/}
        </div>
    )
}
export default FlowComponent;