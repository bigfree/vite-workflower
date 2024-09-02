import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import {SxProps} from "@mui/system";
import {FC, Fragment} from "react"
import {ActionType} from "../../types/action.types";

/**
 * ActionIconByTypeComponent Props
 */
type ActionIconByTypeComponentProps = {
    type: ActionType | undefined,
    sx?: SxProps,
}

/**
 * ActionIconByType Component
 * @param type
 * @param sx
 * @constructor
 */
const ActionIconByTypeComponent: FC<ActionIconByTypeComponentProps> = ({type, sx = {}}): JSX.Element => {
    return (
        <Fragment>
            {ActionType.INPUT === type ? <InputOutlinedIcon sx={sx}/> : ''}
            {ActionType.SELECT === type ? <FormatListNumberedOutlinedIcon sx={sx}/> : ''}
            {ActionType.TEXTAREA === type ? <WysiwygOutlinedIcon sx={sx}/> : ''}
            {ActionType.CHECKBOX === type ? <CheckBoxOutlinedIcon sx={sx}/> : ''}
            {ActionType.MULTISELECT === type ? <DnsOutlinedIcon sx={sx}/> : ''}
            {ActionType.NESTED_WORKFLOW === type ? <AccountTreeOutlinedIcon sx={sx}/> : ''}
        </Fragment>
    )
}
export default ActionIconByTypeComponent;