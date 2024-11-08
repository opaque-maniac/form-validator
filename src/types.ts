export interface RuleValues {
    value: number | string | boolean | RegExp
    error?: string
}

export interface RuleObj {
    [k: string]: {
        required: boolean | RuleValues
        pattern?: RuleValues
        minLength?: number | RuleValues
        maxLength?: number | RuleValues
        hasCap?: boolean | RuleValues
        hasNum?: boolean | RuleValues
        hasSpecial?: boolean | RuleValues
        equal?: string
    }
}

export interface FormValueData {
    [k: string]: string
}

export interface FormValidationErrors {
    [k: string]: string
}

export interface ValidationReturn {
    valid: boolean
    errors: FormValidationErrors
}

