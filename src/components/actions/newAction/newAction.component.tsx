import {Alert, Box, Button, Tab, tabClasses, TabList, TabPanel, Tabs, Typography} from "@mui/joy";
import {Snackbar} from "@mui/material";
import {nanoid} from "nanoid";
import {FC, Fragment, useCallback} from "react";
import {FormProvider, SubmitHandler, useForm, useWatch} from "react-hook-form";
import useActionStore from "../../../store/action.store";
import {ActionEntity, ActionType, FormInputsType} from "../../../types/action.types";
import NewActionAdditionalTabComponent from "./newActionAdditionalTab.component";
import NewActionBasicTabComponent from "./newActionBasicTab.component";
import NewActionDataTabComponent from "./newActionDataTab.component";
import NewActionSelectTypeInputComponent from "./newActionSelectTypeInput.component";

/**
 * New action component
 * @constructor
 */
const NewActionComponent: FC = (): JSX.Element => {
    const {setAction, getAction} = useActionStore();
    const methods = useForm<FormInputsType>({
        defaultValues: {
            type: ActionType.INPUT,
            actionId: '',
            label: '',
            name: '',
            description: '',
            data: [{
                id: '',
                name: '',
                isDefault: false,
            }],
        },
    });

    const type = useWatch({
        control: methods.control,
        name: "type",
    });

    const onSubmit: SubmitHandler<FormInputsType> = useCallback((data) => {
        const storeAction: ActionEntity | undefined = getAction(data.actionId);
        console.log(data);
        if (!storeAction) {
            setAction({
                id: nanoid(),
                ...data
            });
        } else {
            console.log('Action exist!')
        }
    }, []);

    return (
        <Fragment>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <NewActionSelectTypeInputComponent/>
                    <Tabs defaultValue={0} sx={{'--Tabs-gap': '0px'}}>
                        <TabList
                            variant={'outlined'}
                            sx={() => ({
                                '--List-item-radius': '0px',
                                mx: -2,
                                mb: 2,
                                borderRadius: 0,
                                border: 0,
                                borderBottom: 1,
                                borderBottomColor: 'neutral.100',
                                borderTop: 1,
                                borderTopColor: 'neutral.100',
                                p: 0,
                                display: 'flex',
                                [`& .${tabClasses.root}`]: {
                                    borderRadius: 0,
                                    boxShadow: 'none',
                                    borderBottom: 0,
                                    borderLeft: 1,
                                    borderLeftColor: 'neutral.100',
                                    py: 1,
                                    position: 'relative',
                                    flex: '1 1 100%'
                                },
                                [`& .${tabClasses.root}:first-of-type`]: {
                                    borderLeft: 0
                                },
                                [`& .${tabClasses.selected}`]: {
                                    color: 'primary.500'
                                },
                                [`& .${tabClasses.selected}:before`]: {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: -1,
                                    left: 0,
                                    width: '100%',
                                    height: '1px',
                                    backgroundColor: 'primary.400'
                                },
                                [`& .${tabClasses.root}:not(.${tabClasses.selected}):hover`]: {
                                    backgroundColor: 'neutral.50'
                                }
                            })}
                        >
                            <Tab>Basic</Tab>
                            <Tab>Data</Tab>
                            <Tab>Additional</Tab>
                        </TabList>
                        <TabPanel value={0}>
                            <NewActionBasicTabComponent/>
                        </TabPanel>
                        <TabPanel value={1}>
                            {([ActionType.SELECT, ActionType.MULTISELECT].includes(type)) ? (
                                <NewActionDataTabComponent/>
                            ) : (
                                <Alert color={'neutral'} variant={'outlined'}
                                       sx={{mb: 2, justifyContent: 'center', borderColor: 'neutral.100'}}>
                                    <Typography level={'h5'}>
                                        No data for this type 😢
                                    </Typography>
                                </Alert>
                            )}
                        </TabPanel>
                        <TabPanel value={2}>
                            <NewActionAdditionalTabComponent/>
                        </TabPanel>
                    </Tabs>
                    <Box
                        sx={{
                            borderTop: 1,
                            mx: -2,
                            px: 2,
                            pt: 2,
                            borderTopColor: 'neutral.100'
                        }}
                    >
                        <Button type={'submit'}>Create action</Button>
                    </Box>
                </form>
            </FormProvider>
        </Fragment>
    );
}
export default NewActionComponent;