import type {
  FormValidationErrors,
  FormValueData,
  RuleObj,
  ValidationReturn,
} from "./types";
import validateField from "./validatefield";

// Validate input form
const validateForm = (
  data: FormValueData,
  rules: RuleObj,
): ValidationReturn => {
  const fErrors: FormValidationErrors = {};
  let isValid: boolean = true;

  if (Object.keys(data).length === 0) {
    throw new Error("Empty object passed as form data");
  }

  for (let [k, v] of Object.entries(data)) {
    const _rules = rules[k];

    if (!_rules) {
      throw new Error(`Field ${k} does not have a validation rule`);
    }
    const { valid, errors } = validateField(k, v, _rules);
    isValid = isValid && valid;
    fErrors[k] = errors;
  }

  return {
    valid: isValid,
    errors: fErrors,
  };
};

export default validateForm;
