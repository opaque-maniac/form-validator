export interface RuleValues {
  error?: string;
}

export interface BoolRuleValues extends RuleValues {
  value: boolean;
}

export interface RegRuleValues extends RuleValues {
  value: RegExp;
}

export interface NumRuleValues extends RuleValues {
  value: number;
}

export interface StrRuleValues extends RuleValues {
  value: string;
}

export interface RuleConditions {
  required?: boolean | BoolRuleValues;
  pattern?: RegExp | RegRuleValues;
  minLength?: number | NumRuleValues;
  maxLength?: number | NumRuleValues;
  hasUpper?: boolean | BoolRuleValues;
  hasLower?: boolean | BoolRuleValues;
  hasNum?: boolean | BoolRuleValues;
  hasSpecial?: boolean | BoolRuleValues;
  equal?: string | StrRuleValues;
  custom?: (field: string) => boolean;
}

export interface RuleObj {
  [field: string]: RuleConditions;
}

export interface FormValueData {
  [field: string]: string;
}

export interface FormValidationErrors {
  [field: string]: string[];
}

export interface ValidationReturn {
  valid: boolean;
  errors: FormValidationErrors;
}

export interface ValidateFieldReturn {
  valid: boolean;
  errors: string[];
}
