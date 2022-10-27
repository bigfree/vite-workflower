import {FC, Fragment, DragEvent, useCallback} from "react";

/**
 * Actions component
 * @constructor
 */
const ActionsComponent: FC = (): JSX.Element => {
    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, nodeType: string) => {
        console.log(event, nodeType)
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }, []);

    return (
        <Fragment>
            <div style={{
                padding: '10px',
                borderLeft: '1px solid #e4e4e4'
            }}>
                <div
                    style={{
                        width: '50px',
                        height: '30px',
                        border: '1px solid black',
                        cursor: 'grab',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onDragStart={(event) => onDragStart(event, 'default')}
                >
                    Node
                </div>
            </div>
        </Fragment>
    )
}
export default ActionsComponent;