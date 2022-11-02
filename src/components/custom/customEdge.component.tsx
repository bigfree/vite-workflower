import {FC, Fragment, useCallback} from "react";
import {EdgeProps, getStraightPath, useStore} from "reactflow";
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
            <foreignObject
                width={30}
                height={30}
                x={labelX - 30 / 2}
                y={labelY - 30 / 2}
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <button>
                    ×
                </button>
            </foreignObject>
        </Fragment>
    );
}
export default CustomEdgeComponent;