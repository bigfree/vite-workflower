import {ConnectionLineComponentProps} from "@reactflow/core/dist/esm/types/edges";
import {FC} from "react";
import {getStraightPath} from "reactflow";

/**
 * Custom connection line
 * @param data
 * @constructor
 */
const CustomLineComponent: FC<ConnectionLineComponentProps> = (data): JSX.Element => {
    const [edgePath] = getStraightPath({
        sourceX: data.fromX,
        sourceY: data.fromY,
        targetX: data.toX,
        targetY: data.toY,
    });

    return (
        <g>
            <path style={data.connectionLineStyle} fill="none" d={edgePath}/>
            <circle cx={data.toX} cy={data.toY} fill="black" r={3} stroke="black" strokeWidth={1.5}/>
        </g>
    );
}
export default CustomLineComponent;