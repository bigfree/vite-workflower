import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Box, Button, IconButton, Input, Stack, Switch, Typography} from "@mui/joy";
import {FormControl} from "@mui/material";
import {ChangeEvent, FC} from "react";
import {Controller, useFieldArray, useFormContext, UseFormReturn} from "react-hook-form";
import {FormInputsType} from "../../../../types/action.types";

/**
 * ActionDataTab component
 * @constructor
 */
const FormActionDataTabComponent: FC = (): JSX.Element => {
    const {control, setValue, formState: {errors}}: UseFormReturn<FormInputsType> = useFormContext<FormInputsType>();

    const {fields, append, remove} = useFieldArray<FormInputsType>({
        control,
        name: "data"
    });

    return (
        <Stack>
            <Stack
                direction={'column'}
                sx={{
                    mb: 2
                }}
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
                        sx={{mb: 2}}
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
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            setValue(`data.${index}.isDefault`, event.target.checked);
                                        }}
                                    />
                                )}
                            />
                        </FormControl>
                        <IconButton
                            variant={'plain'}
                            color={'neutral'}
                            sx={{flex: '0 0 40px'}}
                            disabled={1 >= fields.length}
                            onClick={() => remove(index)}
                        >
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                    </Stack>
                ))}
                <Button
                    variant={'soft'}
                    color={'neutral'}
                    onClick={() => append({id: '', name: '', isDefault: false})}
                >
                    Add value
                </Button>
            </Stack>
        </Stack>
    );
}

export default FormActionDataTabComponent;