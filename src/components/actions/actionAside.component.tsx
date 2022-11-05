import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Box, IconButton, Stack, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useActionStore from "../../store/action.store";
import useAppStore from "../../store/app.store";
import ActionListComponent from "./actionList.component";

/**
 * ActionList component
 * @constructor
 */
const ActionAsideComponent: FC = (): JSX.Element => {
    const {setOpenActions} = useAppStore();
    const {newActionStateSizes, changeNewActionSizes, listActionStateSizes, changeListActionSizes} = useActionStore();

    return (
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'stretch',
                    flexBasis: 450,
                    borderLeft: 1,
                    borderLeftColor: 'neutral.100'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        // flexGrow: 1,
                        // flexBasis: 'auto',
                        // flexShrink: 1
                    }}
                >
                    <Stack
                        direction={'row'}
                        sx={{
                            borderBottom: 1,
                            borderBottomColor: 'neutral.100',
                            flexBasis: 80,
                            flexGrow: 0,
                            flexShrink: 0,
                            padding: 2,
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                mr: 'auto'
                            }}
                            level={'h5'}
                        >
                            Actions
                        </Typography>
                        <IconButton
                            variant={'plain'}
                            color={'neutral'}
                            onClick={() => setOpenActions(false)}
                        >
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </Stack>
                    <ActionListComponent/>
                </Box>
            </Box>
        </Fragment>
    );
}
export default ActionAsideComponent;