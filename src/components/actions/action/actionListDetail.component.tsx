import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import {Box, Card, CardContent, IconButton, Typography} from "@mui/joy";
import {FC} from "react";
import {useDrag} from "react-dnd";
import {ActionEntity, ActionType} from "../../../types/action.types";
import {DropResult, ItemTypes} from "../../../types/item.types";

type ActionListDetailProps = {
    action: ActionEntity;
}

/**
 * Action list detail
 * @constructor
 */
const ActionListDetailComponent: FC<ActionListDetailProps> = ({action}): JSX.Element => {
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
            borderColor: 'neutral.100',
            boxShadow: 'none',
            '&:hover': {
                boxShadow: '2px 2px 0 0 rgba(0, 0, 0, .06)',
            }
        }}>
            <Box
                sx={{
                    my: -1,
                    ml: -1,
                    px: 2,
                    borderRight: 1,
                    borderRightColor: 'neutral.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {ActionType.INPUT === action.type ? <InputOutlinedIcon/> : ''}
                {ActionType.SELECT === action.type ? <FormatListNumberedOutlinedIcon/> : ''}
                {ActionType.TEXTAREA === action.type ? <WysiwygOutlinedIcon/> : ''}
                {ActionType.CHECKBOX === action.type ? <CheckBoxOutlinedIcon/> : ''}
                {ActionType.MULTISELECT === action.type ? <DnsOutlinedIcon/> : ''}
                {ActionType.NESTED_WORKFLOW === action.type ? <AccountTreeOutlinedIcon/> : ''}
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
                    borderLeftColor: 'neutral.100',
                    borderRadius: 0
                }}
            >
                <EditOutlinedIcon/>
            </IconButton>
        </Card>
    );
}
export default ActionListDetailComponent;