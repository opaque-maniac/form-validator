import type { RuleConditions, ValidateFieldReturn } from "./types";

// Validate input field
const validateField = (
  label: string,
  field: string,
  rule: RuleConditions,
): ValidateFieldReturn => {
  const {
    required,
    pattern,
    minLength,
    maxLength,
    hasCap,
    hasLower,
    hasNum,
    hasSpecial,
    equal,
  } = rule;

  if (typeof field !== "string")
    throw new Error(`Field ${label} is not a string`);

  let valid: boolean = true;
  let errors: string[] = [];

  const addError = (condition: boolean, error: string) => {
    if (condition) {
      valid = false;
      errors.push(error);
    }
  };

  if (required) {
    const isRequired =
      typeof required === "boolean" ? required : required.value;
    const condition = isRequired && !field;
    const error =
      typeof required === "boolean" || !required.error
        ? `Field ${label} is required`
        : required.error;

    addError(condition, error);
  }

  if (pattern) {
    const regex = pattern instanceof RegExp ? pattern : pattern.value;
    if (!regex) throw new Error(`Field ${label} has no pattern`);

    const condition = !regex.test(field);
    const error =
      pattern instanceof RegExp || !pattern.error
        ? `Field ${label} has invalid format`
        : pattern.error;

    addError(condition, error);
  }

  if (minLength) {
    if (typeof minLength !== "number" && !minLength.value)
      throw new Error(`Field ${label} has no length`);

    const length = typeof minLength === "number" ? minLength : minLength.value;
    const condition = field.length < length;
    const error =
      typeof minLength === "number" || !minLength.error
        ? `Field ${label} is shorter than ${length ?? "required"}`
        : minLength.error;

    addError(condition, error);
  }

  if (maxLength) {
    if (typeof maxLength !== "number" && !maxLength.value)
      throw new Error(`Field ${label} has no length`);

    const length = typeof maxLength === "number" ? maxLength : maxLength.value;
    const condition = field.length > length;
    const error =
      typeof maxLength === "number" || !maxLength.error
        ? `Field ${label} is longer than ${length ?? "required"}`
        : maxLength.error;

    addError(condition, error);
  }

  if (hasCap) {
    const cap = typeof hasCap === "boolean" ? hasCap : hasCap.value;
    if (typeof cap === "undefined")
      throw new Error(`Field ${label} has no uppercase value`);

    const regex = /[A-Z]/;
    const condition = !regex.test(field);
    const error =
      typeof hasCap === "boolean" || !hasCap.error
        ? `Field ${label} does not have an uppercase character`
        : hasCap.error;

    addError(condition, error);
  }

  if (hasLower) {
    const lower = typeof hasLower === "boolean" ? hasLower : hasLower.value;
    if (typeof lower === "undefined")
      throw new Error(`Field ${label} has no lowercase value`);

    const regex = /[a-z]/;
    const condition = !regex.test(field);
    const error =
      typeof hasLower === "boolean" || !hasLower.error
        ? `Field ${label} does not have a lowercase character`
        : hasLower.error;

    addError(condition, error);
  }

  if (hasSpecial) {
    const special =
      typeof hasSpecial === "boolean" ? hasSpecial : hasSpecial.value;
    if (typeof special === "undefined")
      throw new Error(`Field ${label} has no special value`);

    const regex = /[^\w\s]/;
    const condition = !regex.test(field);
    const error =
      typeof hasSpecial === "boolean" || !hasSpecial.error
        ? `Field ${label} does not have a special character`
        : hasSpecial.error;

    addError(condition, error);
  }

  if (hasNum) {
    const numm = typeof hasNum === "boolean" ? hasNum : hasNum.value;
    if (typeof numm === "undefined")
      throw new Error(`Field ${label} has no number value`);

    const regex = /[0-9]/;
    const condition = !regex.test(field);
    const error =
      typeof hasNum === "boolean" || !hasNum.error
        ? `Field ${label} does not have a number`
        : hasNum.error;

    addError(condition, error);
  }

  if (equal) {
    if (typeof equal !== "string" && !equal.value)
      throw new Error(`Field ${label} has no equal value`);

    const isEqual =
      typeof equal === "string" ? equal === field : field === equal.value;
    const condition = !isEqual;
    const error =
      typeof equal === "string" || !equal.error
        ? `Field ${label} not equal to ${
            typeof equal === "string"
              ? equal
              : typeof equal.value === "string"
                ? equal.value
                : "required value"
          }`
        : equal.error;

    addError(condition, error);
  }

  return {
    valid,
    errors,
  };
};

export default validateField;
