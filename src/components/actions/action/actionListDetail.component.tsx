import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {Box, Card, CardContent, IconButton, Typography} from "@mui/joy";
import {FC} from "react";
import {useDrag} from "react-dnd";
import useModalStore, {ModalStoreState, ModalType} from "../../../store/modal.store";
import {ActionEntity} from "../../../types/action.types";
import {DropResult, ItemTypes} from "../../../types/item.types";
import ActionIconByTypeComponent from "../../shared/actionIconByType.component";

type ActionListDetailProps = {
    action: ActionEntity;
}

/**
 * Action list detail
 * @constructor
 */
const ActionListDetailComponent: FC<ActionListDetailProps> = ({action}): JSX.Element => {
    const setModal = useModalStore((store: ModalStoreState) => store.setModal);
    const [{isDragging}, drag] = useDrag<ActionEntity, DropResult, { isDragging: boolean }>(() => ({
        type: ItemTypes.ACTION,
        item: action,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId,
        }),
    }))
    // const [textType, setTextType] = useState<string>('');
    //
    // useEffect(() => {
    //     switch (action.type) {
    //         case ActionType.INPUT:
    //             setTextType('Input')
    //             break;
    //         case ActionType.SELECT:
    //             setTextType('Select')
    //             break;
    //         case ActionType.TEXTAREA:
    //             setTextType('Textarea')
    //             break;
    //         case ActionType.CHECKBOX:
    //             setTextType('Textarea')
    //             break;
    //         case ActionType.MULTISELECT:
    //             setTextType('Multiselect')
    //             break;
    //         case ActionType.NESTED_WORKFLOW:
    //             setTextType('Workflow')
    //             break;
    //     }
    // }, [action]);

    return (
        <Card ref={drag} row variant={'outlined'} sx={{
            mb: 2,
            p: 1,
            borderRadius: 4,
            borderColor: isDragging ? 'blue.50' : 'neutral.100',
            boxShadow: isDragging ? '2px 2px 0 0 rgba(29, 143, 237, .06)' : 'none',
            '&:hover': {
                boxShadow: isDragging ? '2px 2px 0 0 rgba(29, 143, 237, .1)' : '2px 2px 0 0 rgba(0, 0, 0, .06)',
            }
        }}>
            <Box
                sx={{
                    my: -1,
                    ml: -1,
                    px: 2,
                    borderRight: 1,
                    borderRightColor: isDragging ? 'blue.50' : 'neutral.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActionIconByTypeComponent type={action?.type}/>
            </Box>
            <CardContent
                sx={{
                    m: 0,
                    px: 1,
                }}
            >
                <Typography level={'body4'}>
                    #{action.actionId}
                </Typography>
                <Typography level={'body1'} sx={{
                    pl: 0.5
                }}>
                    {action.name}
                </Typography>
            </CardContent>
            <IconButton
                color={'neutral'}
                variant={'plain'}
                sx={{
                    my: -1,
                    mr: -1,
                    px: 2,
                    borderLeft: 1,
                    borderLeftColor: isDragging ? 'blue.50' : 'neutral.100',
                    borderRadius: 0
                }}
                onClick={() => setModal({
                    id: action.actionId,
                    type: ModalType.ACTION_EDIT,
                    open: true,
                })}
            >
                <EditOutlinedIcon/>
            </IconButton>
        </Card>
    );
}
export default ActionListDetailComponent;