import {Alert, Box, Button, Tab, tabClasses, TabList, TabPanel, Tabs, Typography} from "@mui/joy";
import {nanoid} from "nanoid";
import {FC, Fragment, useCallback} from "react";
import {FormProvider, SubmitHandler, useForm, useWatch} from "react-hook-form";
import useActionStore, {ActionStoreState} from "../../../store/action.store";
import {ActionEntity, ActionType, FormInputsType} from "../../../types/action.types";
import FormActionAdditionalTabComponent from "./tabs/formActionAdditionalTab.component";
import FormActionBasicTabComponent from "./tabs/formActionBasicTab.component";
import FormActionDataTabComponent from "./tabs/formActionDataTab.component";
import FormActionSelectTypeInputComponent from "./inputs/formActionSelectTypeInput.component";

/**
 * NewActionComponent Props type
 */
type NewActionComponentProps = {
    action?: ActionEntity,
}

/**
 * SetAction Selector
 * @param state
 * @constructor
 */
const setActionSelector = (state: ActionStoreState) => state.setAction;
/**
 * GetAction Selector
 * @param state
 * @constructor
 */
const getActionSelector = (state: ActionStoreState) => state.getAction;

/**
 * DefaultForm values
 */
const defaultFormValues: ActionEntity = {
    id: '',
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
};

/**
 * NewAction component
 * @constructor
 */
const FormActionComponent: FC<NewActionComponentProps> = ({action}): JSX.Element => {
    const setAction = useActionStore(setActionSelector);
    const getAction = useActionStore(getActionSelector);

    const methods = useForm<FormInputsType>({
        defaultValues: action ?? defaultFormValues,
    });

    const type = useWatch({
        control: methods.control,
        name: "type",
    });

    const onSubmit: SubmitHandler<FormInputsType> = useCallback((data) => {
        if (action) {
            setAction({
                id: action.id,
                ...data
            });
        } else {
            if (!getAction(data.actionId)) {
                setAction({
                    id: nanoid(),
                    ...data
                });
            } else {
                console.log('Action exist!')
            }
        }
    }, [setAction, getAction, action]);

    return (
        <Fragment>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormActionSelectTypeInputComponent/>
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
                                backgroundColor: 'white',
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
                            <FormActionBasicTabComponent/>
                        </TabPanel>
                        <TabPanel value={1}>
                            {([ActionType.SELECT, ActionType.MULTISELECT].includes(type)) ? (
                                <FormActionDataTabComponent/>
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
                            <FormActionAdditionalTabComponent/>
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
                        <Button type={'submit'}>{action ? 'Save action' : 'Create action'}</Button>
                    </Box>
                </form>
            </FormProvider>
        </Fragment>
    );
}
export default FormActionComponent;