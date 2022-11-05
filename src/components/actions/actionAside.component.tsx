import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Box, IconButton, Stack, Typography} from "@mui/joy";
import {NumberSize, Resizable} from "re-resizable";
import {FC, Fragment} from "react";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
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
                component={ReflexContainer}
                orientation={'horizontal'}
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
                    component={ReflexElement}
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
                <Box
                    component={ReflexSplitter}
                    propagate={true}
                    sx={{
                        height: 10,
                        borderTop: 5,
                        borderTopColor: 'neutral.100',
                        cursor: 'row-resize'
                    }}
                />
                {/*TODO: spravit controlled size*/}
                <Box
                    component={ReflexElement}
                    // component={Resizable}
                    // minHeight={'50%'}
                    // size={newActionStateSizes}
                    // onResize={(e, direction, ref, delta: NumberSize) => changeNewActionSizes({
                    //     width: 'auto',
                    //     height: Number(newActionStateSizes.height) + Number(delta.height)
                    // })}
                    sx={{
                        // borderTop: 1,
                        // borderTopColor: 'neutral.100',
                        // flexBasis: 'auto',
                        // flexShrink: 1,
                        // flexGrow: 1
                    }}
                    // bounds={'parent'}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deserunt dolorum eligendi esse neque obcaecati perferendis porro quasi soluta totam. Autem dignissimos eligendi laboriosam maiores necessitatibus obcaecati odit praesentium quasi.
                </Box>
            </Box>
        </Fragment>
    );
}
export default ActionAsideComponent;