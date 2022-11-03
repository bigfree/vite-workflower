import {FC, Fragment, useCallback} from "react";
import {EdgeLabelRenderer, EdgeProps, getStraightPath, useStore} from "reactflow";
import {EdgeData, NodeEntity} from "../../store/flow.store";
import {getEdgeParams} from "../../utils";

/**
 * Custom edge
 * @param id
 * @param source
 * @param target
 * @param markerEnd
 * @param style
 * @constructor
 */
const CustomEdgeComponent: FC<EdgeProps<EdgeData>> = ({id, source, target, markerEnd, style}): JSX.Element | null => {
    const sourceNode: NodeEntity | undefined = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    );
    const targetNode: NodeEntity | undefined = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    );

    if (!sourceNode || !targetNode) {
        return null;
    }

    const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);

    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });

    return (
        <Fragment>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                style={style}
            />

            <EdgeLabelRenderer>
                    <button style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        width: '20px',
                        height: '20px',
                        background: '#ffffff',
                        borderRadius: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        border: '1px solid #ededed',
                        zIndex: 99
                    }}>X</button>
            </EdgeLabelRenderer>
        </Fragment>
    );
}
export default CustomEdgeComponent;