/**
 * @module validateform
 * @description micro library function for form validation
 * Validate form data
 * @param {FormValueData} data - form data to validate
 * @param {RuleObj} rules - validation rules for the form data
 * @returns {ValidationReturn} - object containing validation result
 */

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
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error("data: FormValueData must be an object");
  }

  if (typeof rules !== "object" || rules === null || Array.isArray(rules)) {
    throw new Error("data: FormValueData must be an object");
  }

  const fErrors: FormValidationErrors = {};
  let isValid: boolean = true;

  for (let [k, v] of Object.entries(data)) {
    const _rules = rules[k];

    if (!_rules) {
      continue;
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
