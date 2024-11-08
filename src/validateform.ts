import type {
  FormValidationErrors,
  FormValueData,
  RuleObj,
  ValidationReturn,
} from "./types";
import { validateField } from "./validatefield";

// Validate input form
export const validateForm = (
  data: FormValueData,
  rules: RuleObj,
): ValidationReturn => {
  const errors: FormValidationErrors = {};
  let valid: boolean = false;

  if (Object.keys(data).length !== 0) {
    throw new Error("Empty object passed as form data");
  }

  for (let [k, v] of Object.entries(data)) {
    const _rules = rules[k];

    if (!_rules) {
      throw new Error(`Field ${k} does not have a validation rule`);
    }
    console.log(validateField(k, v, _rules));
  }

  return {
    valid,
    errors,
  };
};
