import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Box, IconButton, Stack, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useAppStore from "../../store/app.store";
import ActionListComponent from "./actionList.component";

/**
 * ActionList component
 * @constructor
 */
const ActionAsideComponent: FC = (): JSX.Element => {
    const {setOpenActions} = useAppStore();

    return (
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    flexBasis: 400,
                    borderLeft: 1,
                    borderLeftColor: 'neutral.100'
                }}
            >
                <Stack
                    direction={'row'}
                    sx={{
                        borderBottom: 1,
                        borderBottomColor: 'neutral.100',
                        flexBasis: 80,
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
        </Fragment>
    );
}
export default ActionAsideComponent;