import {CSSProperties, FC, Fragment} from "react";
import {Handle, NodeProps, Position, useStore} from "reactflow";
import {NodeData} from "../../store/flow.store";

const targetHandle: CSSProperties = {
    width: '100%',
    height: '100%',
    background: 'blue',
    position: 'absolute',
    top: '0',
    left: '0',
    borderRadius: '0',
    transform: 'none',
    border: 'none',
    opacity: '0',
}

const connectionNodeIdSelector = (state: { connectionNodeId: any; }) => state.connectionNodeId;

/**
 * Custom node
 * @param node
 * @constructor
 */
const CustomNodeComponent: FC<NodeProps<NodeData>> = (node): JSX.Element => {
    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isTarget = connectionNodeId && connectionNodeId !== node.id;

    const targetHandleStyle = {zIndex: isTarget ? 3 : 1};

    return (
        <Fragment>
            <div style={{
                paddingLeft: '15px',
                border: '1px solid black',
                backgroundColor: '#000',
            }}>
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '0 10px',
                        height: '40px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Handle
                        className="targetHandle"
                        style={{...targetHandle, zIndex: 2}}
                        position={Position.Right}
                        type="source"
                    />
                    <Handle
                        className="targetHandle"
                        position={Position.Left}
                        style={{...targetHandle, ...targetHandleStyle}}
                        type="target"
                    />
                    {node.data.label}
                </div>
            </div>
        </Fragment>
    )
}
export default CustomNodeComponent;