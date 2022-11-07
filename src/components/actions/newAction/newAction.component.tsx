import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {Box, Button, Divider, FormLabel, IconButton, Input, Option, Select, Stack, Switch, Typography} from "@mui/joy";
import {FormControl} from "@mui/material";
import {nanoid} from "nanoid";
import {ChangeEvent, FC, Fragment, useCallback} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm, useWatch} from "react-hook-form";
import useActionStore, {ActionEntity, ActionType} from "../../../store/action.store";

type ActionTypesSelectValues = {
    id: ActionType;
    name: string;
}

export type FormInputsType = Omit<ActionEntity, 'id'>

const actionsTypeSelectValues: ActionTypesSelectValues[] = [{
    id: ActionType.INPUT,
    name: 'Input'
}, {
    id: ActionType.SELECT,
    name: 'Select'
}, {
    id: ActionType.TEXTAREA,
    name: 'Textarea'
}, {
    id: ActionType.CHECKBOX,
    name: 'Checkbox'
}, {
    id: ActionType.MULTISELECT,
    name: 'Multiselect'
}];

const NewActionComponent: FC = (): JSX.Element => {
    const {setAction} = useActionStore();
    const {control, setValue, handleSubmit, formState: {errors}} = useForm<FormInputsType>({
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

    const {fields, append, remove} = useFieldArray({
        name: "data",
        control
    });

    const type = useWatch({
        control,
        name: "type",
    });

    const onSubmit: SubmitHandler<FormInputsType> = useCallback((data) => {
        console.log(data);
        setAction({
            id: nanoid(),
            ...data
        });
    }, []);

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction={'column'}
                >
                    <FormControl>
                        <FormLabel htmlFor={'select-actionType'}>Action Type</FormLabel>
                        <Controller
                            name={'type'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    placeholder={'Select action type'}
                                    sx={{
                                        mb: 1
                                    }}
                                    componentsProps={{
                                        button: {
                                            id: 'select-actionType'
                                        }
                                    }}
                                    onChange={(event, value) => {
                                        if (null !== value) {
                                            setValue('type', value)
                                        }
                                    }}
                                >
                                    {actionsTypeSelectValues.map((item: ActionTypesSelectValues, index: number) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Divider orientation={'horizontal'} sx={{my: 2, mx: -2}}/>
                    <FormControl sx={{mb: 2}}>
                        <FormLabel htmlFor={'input-actionId'}>Action ID</FormLabel>
                        <Controller
                            name={'actionId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    autoComplete={'off'}
                                    error={errors.actionId && true}
                                    placeholder={'Set action ID'}
                                    componentsProps={{
                                        input: {
                                            id: 'input-actionId'
                                        }
                                    }}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setValue('actionId', event.target.value)}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl sx={{mb: 2}}>
                        <FormLabel htmlFor={'input-label'}>Action Label</FormLabel>
                        <Controller
                            name={'label'}
                            control={control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    autoComplete={'off'}
                                    placeholder={'Set action label'}
                                    componentsProps={{
                                        input: {
                                            id: 'input-label'
                                        }
                                    }}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setValue('label', event.target.value)}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl sx={{mb: 2}}>
                        <FormLabel htmlFor={'input-name'}>Action Name</FormLabel>
                        <Controller
                            name={'name'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    autoComplete={'off'}
                                    error={errors.name && true}
                                    placeholder={'Set action name'}
                                    componentsProps={{
                                        input: {
                                            id: 'input-name'
                                        }
                                    }}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setValue('name', event.target.value)}
                                />
                            )}
                        />
                    </FormControl>
                    {([ActionType.SELECT, ActionType.MULTISELECT].includes(type)) ? (
                        <Fragment>
                            <Divider orientation={'horizontal'} sx={{my: 2, mx: -2}}/>
                            <Stack
                                direction={'column'}
                            >
                                <Stack
                                    direction={'row'}
                                    sx={{mb: 1}}
                                    spacing={2}
                                >
                                    <Box sx={{flex: '1'}}>
                                        <Typography>Data ID</Typography>
                                    </Box>
                                    <Box sx={{flex: '1'}}>
                                        <Typography>Data name</Typography>
                                    </Box>
                                    <Box sx={{flex: '0 0 70px'}}>
                                        <Typography>Default?</Typography>
                                    </Box>
                                    <Box sx={{flex: '0 0 40px'}}></Box>
                                </Stack>
                                {fields.map((field, index) => (
                                    <Stack
                                        direction={'row'}
                                        key={index}
                                        sx={{mb: 1}}
                                        spacing={2}
                                    >
                                        <FormControl sx={{flex: '1'}}>
                                            <Controller
                                                name={`data.${index}.id`}
                                                control={control}
                                                rules={{required: true}}
                                                render={({field}) => (
                                                    <Input
                                                        {...field}
                                                        autoComplete={'off'}
                                                        placeholder={'Set data Id'}
                                                        error={errors?.data?.[index]?.id && true}
                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(`data.${index}.id`, event.target.value)}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        <FormControl sx={{flex: '1'}}>
                                            <Controller
                                                name={`data.${index}.name`}
                                                control={control}
                                                rules={{required: true}}
                                                render={({field}) => (
                                                    <Input
                                                        {...field}
                                                        autoComplete={'off'}
                                                        placeholder={'Set data name'}
                                                        error={errors?.data?.[index]?.name && true}
                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(`data.${index}.name`, event.target.value)}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        <FormControl sx={{flex: '0 0 70px', justifyContent: 'center'}}>
                                            <Controller
                                                name={`data.${index}.isDefault`}
                                                control={control}
                                                rules={{required: false}}
                                                render={({field}) => (
                                                    <Switch
                                                        {...field}
                                                        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(`data.${index}.isDefault`, event.target.checked)}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        <IconButton
                                            variant={'plain'}
                                            color={'neutral'}
                                            sx={{flex: '0 0 40px'}}
                                            onClick={() => remove(index)}
                                        >
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>
                                    </Stack>
                                ))}
                            </Stack>
                            <Button
                                variant={'soft'}
                                color={'neutral'}
                                onClick={() => append({id: '', name: '', isDefault: false})}
                            >
                                Add value
                            </Button>
                            <Divider orientation={'horizontal'} sx={{my: 2, mx: -2}}/>
                        </Fragment>
                    ) : ''}
                </Stack>
                <Button type={'submit'}>Create action</Button>
            </form>
        </Fragment>
    )
}
export default NewActionComponent;