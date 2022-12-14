import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import {IconButton, Stack, Typography} from "@mui/joy";
import {FC, Fragment, memo} from "react";
import useAppStore from "../store/app.store";
import NodeComponent from "./node.component";

/**
 * Actions component
 * @constructor
 */
const AsideComponent: FC = (): JSX.Element => {
    const {setOpenActions} = useAppStore();

    return (
        <Fragment>
            <Stack
                direction={'column'}
                sx={{
                    width: 81,
                    borderLeft: 1,
                    borderLeftColor: 'neutral.100',
                    flexWrap: 'nowrap',
                    justifyItems: 'stretch',
                    flexShrink: 0,
                    flexBasis: 81,

                }}>
                <IconButton
                    variant={'aside'}
                >
                    <AccountTreeOutlinedIcon sx={{mb:1, width: .4, height: .4}}/>
                    <Typography fontSize={'small'}>Nodes</Typography>
                </IconButton>
                <IconButton
                    variant={'aside'}
                    onClick={() => setOpenActions(true)}
                >
                    <ElectricBoltOutlinedIcon sx={{mb:1, width: .4, height: .4}}/>
                    <Typography fontSize={'small'}>Actions</Typography>
                </IconButton>
                <br/>
                <NodeComponent/>
            </Stack>
        </Fragment>
    )
}
export default memo(AsideComponent);