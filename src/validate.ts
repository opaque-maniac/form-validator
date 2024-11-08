import type {FormValidationErrors, FormValueData, RuleObj, ValidationReturn} from "./types";

export const validate = (data: FormValueData, rules: RuleObj): ValidationReturn => {
    const errors: FormValidationErrors = {}
    let valid: boolean = false
    
    return {
        valid,
        errors
    }
}
