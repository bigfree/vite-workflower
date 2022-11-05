import {Alert, Box, Button, Stack, Typography} from "@mui/joy";
import {FC, Fragment} from "react";
import useActionStore, {ActionEntity} from "../../store/action.store";

const ActionListComponent: FC = (): JSX.Element => {
    const {getAllActions} = useActionStore();

    return (
        <Fragment>
            <Box
                sx={{
                    padding: 2,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 'auto',
                    overflow: 'auto',
                }}
            >
                {getAllActions().length ? (
                    <Stack
                        direction={'column'}
                    >
                        {getAllActions().map((action: ActionEntity) => (
                            <div key={action.id}>{action.name}</div>
                        ))}
                    </Stack>
                ) : (
                    <Alert
                        variant="outlined"
                        color="neutral"
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                mb: 1,
                                fontSize: 30
                            }}
                        >
                            😥
                        </Typography>
                        <Typography
                            level={'h5'}
                            sx={{
                                mb: 1.5
                            }}
                        >
                            Actions is empty
                        </Typography>
                        <Button
                            variant={'plain'}
                        >
                            Add new action
                        </Button>
                    </Alert>
                )}
            </Box>
        </Fragment>
    )
}
export default ActionListComponent;