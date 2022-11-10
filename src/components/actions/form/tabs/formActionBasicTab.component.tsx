import {FormLabel, Input, Stack} from "@mui/joy";
import {FormControl} from "@mui/material";
import {ChangeEvent, FC} from "react";
import {Controller, useFormContext} from "react-hook-form";

/**
 * ActionBasicTab component
 * @constructor
 */
const FormActionBasicTabComponent: FC = (): JSX.Element => {
    const {control, setValue, formState: {errors}} = useFormContext();

    return (
        <Stack
            direction={'column'}
        >
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
        </Stack>
    )
}

export default FormActionBasicTabComponent;