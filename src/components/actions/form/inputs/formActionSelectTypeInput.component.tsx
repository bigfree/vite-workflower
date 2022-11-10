import {FormLabel, Option, Select} from "@mui/joy";
import {FormControl} from "@mui/material";
import {FC, Fragment} from "react";
import {Controller, useFormContext, UseFormReturn} from "react-hook-form";
import {ActionType, ActionTypesSelectValues, FormInputsType} from "../../../../types/action.types";

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
}, {
    id: ActionType.NESTED_WORKFLOW,
    name: 'Connect workflow [NESTED]'
}];

/**
 * Action select type component
 * @constructor
 */
const FormActionSelectTypeInputComponent: FC = (): JSX.Element => {
    const {control, setValue}: UseFormReturn<FormInputsType> = useFormContext<FormInputsType>();

    return (
        <Fragment>
            <FormControl sx={{width: 1, mb: 1}}>
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
        </Fragment>
    );
}

export default FormActionSelectTypeInputComponent;