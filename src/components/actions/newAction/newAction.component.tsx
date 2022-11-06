import {Button, Divider, FormLabel, Input, Option, Select, Stack, TextField} from "@mui/joy";
import {FormControl} from "@mui/material";
import {nanoid} from "nanoid";
import {ChangeEvent, FC, Fragment, useCallback} from "react";
import {Controller, SubmitHandler, useForm, useWatch} from "react-hook-form";
import useActionStore, {ActionEntity, ActionType} from "../../../store/action.store";

type ActionTypesSelectValues = {
    id: ActionType;
    name: string;
}

type FormInputsType = Omit<ActionEntity, 'id'>

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
            data: [],
        },
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
                    {/*{(null !== type) ? (*/}
                    {/*    <Fragment>*/}
                    {/*        <Button type={'submit'}>Create</Button>*/}
                    {/*    </Fragment>*/}
                    {/*) : ''}*/}
                    <Button
                        type={'submit'}
                    >Create</Button>
                </Stack>
            </form>
        </Fragment>
    )
}
export default NewActionComponent;