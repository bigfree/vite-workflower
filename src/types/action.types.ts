export enum ActionType {
    INPUT = 'action/input',
    SELECT = 'action/select',
    CHECKBOX = 'action/checkbox',
    TEXTAREA = 'action/textarea',
    MULTISELECT = 'action/multiselect',
    NESTED_WORKFLOW = 'action/nested_workflow',
}

export type ActionDataEntity = {
    id: string;
    name: string;
    isDefault: boolean;
}
export type ActionEntity = {
    id: string;
    type: ActionType;
    actionId: string;
    name: string;
    description?: string,
    label?: string;
    color?: string | null;
    data?: ActionDataEntity[];
}