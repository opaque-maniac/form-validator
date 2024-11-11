/**
 * @module validateField
 * @description micro library function for form field validation
 * Validate input field
 * @param {string} label - field label
 * @param {string} field - field value to validate
 * @param {RuleConditions} rule - validation rules for the field
 * @returns {ValidateFieldReturn} - object containing validation result
 */

import type {
  boolfunc,
  BoolRuleValues,
  CustomRuleValue,
  NumRuleValues,
  RegRuleValues,
  RuleConditions,
  StrRuleValues,
  ValidateFieldReturn,
} from "./types";

// Validate input field
export const validateField = (
  label: string,
  field: string,
  rule: RuleConditions,
): ValidateFieldReturn => {
  if (typeof rule !== "object" || rule === null || Array.isArray(rule))
    throw new Error(`Field ${label} has invalid rule`);

  if (typeof label !== "string") throw new Error("Label is not a string");

  if (typeof field !== "string") throw new Error("Field is not a string");

  const {
    required,
    pattern,
    minLength,
    maxLength,
    hasUpper,
    hasLower,
    hasNum,
    hasSpecial,
    equal,
    custom,
  } = rule;

  let valid: boolean = true;
  let errors: string[] = [];

  const addError = ({
    condition,
    error,
  }: {
    condition: boolean;
    error: string;
  }) => {
    if (condition) {
      valid = false;
      errors.push(error);
    }
  };

  if (required) {
    const results = handleRequired(required, label, field);
    addError(results);
  } else {
    if (typeof required === "string" || typeof required === "number") {
      throw new Error(`Field ${label} has invalid required value`);
    }
  }

  if (pattern) {
    const results = handlePattern(pattern, label, field);
    addError(results);
  } else {
    if (typeof pattern === "string" || typeof pattern === "number")
      throw new Error(`Field ${label} has invalid pattern value`);
  }

  if (minLength) {
    const results = handleMinLength(minLength, label, field);
    addError(results);
  } else {
    if (typeof minLength === "string" || typeof minLength === "number")
      throw new Error(`Field ${label} has invalid minLength value`);
  }

  if (maxLength) {
    const results = handleMaxLength(maxLength, label, field);
    addError(results);
  } else {
    if (typeof maxLength === "string")
      throw new Error(`Field ${label} has invalid maxLength value`);
  }

  if (hasUpper) {
    const results = handleHasUpper(hasUpper, label, field);
    addError(results);
  } else {
    if (typeof hasUpper === "string" || typeof hasUpper === "number")
      throw new Error(`Field ${label} has invalid hasUpper value`);
  }

  if (hasLower) {
    const results = handleHasLower(hasLower, label, field);
    addError(results);
  } else {
    // Empty string or zero
    if (typeof hasLower === "string" || typeof hasLower === "number")
      throw new Error(`Field ${label} has invalid hasLower value`);
  }

  if (hasSpecial) {
    const results = handleHasSpecial(hasSpecial, label, field);
    addError(results);
  } else {
    if (typeof hasSpecial === "string" || typeof hasSpecial === "number")
      throw new Error(`Field ${label} has invalid hasSpecial value`);
  }

  if (hasNum) {
    const results = handleHasNum(hasNum, label, field);
    addError(results);
  } else {
    if (typeof hasNum === "string" || typeof hasNum === "number")
      throw new Error(`Field ${label} has invalid hasNum value`);
  }

  if (equal) {
    const results = handleEqual(equal, label, field);
    addError(results);
  } else {
    if (typeof equal === "boolean")
      throw new Error(`Field ${label} has invalid equal value`);
  }

  if (custom) {
    const results = handleCustom(custom, label, field);
    addError(results);
  } else {
    if (
      typeof custom === "string" ||
      typeof custom === "number" ||
      typeof custom === "boolean"
    )
      throw new Error(`Field ${label} has invalid custom value`);
  }

  return {
    valid,
    errors,
  };
};

// for required
const handleRequired = (
  required: boolean | BoolRuleValues,
  label: string,
  field: string,
) => {
  if (typeof required !== "boolean" && typeof required.value !== "boolean") {
    throw new Error(`Field ${label} has invalid required value`);
  }

  const isRequired = typeof required === "boolean" ? required : required.value;
  const condition = isRequired && !field;
  const error =
    typeof required === "boolean" || !required.error
      ? `Field ${label} is required`
      : required.error;

  return { condition, error };
};

// for patter
const handlePattern = (
  pattern: RegExp | RegRuleValues,
  label: string,
  field: string,
) => {
  // see if pattern is not a regex or pattern.value is not a regex
  if (!(pattern instanceof RegExp) && !(pattern.value instanceof RegExp))
    throw new Error(`Field ${label} has invalid pattern value`);

  const regex = pattern instanceof RegExp ? pattern : pattern.value;

  const condition = !regex.test(field);
  const error =
    pattern instanceof RegExp || !pattern.error
      ? `Field ${label} has invalid format`
      : pattern.error;

  return { condition, error };
};

// for minlenght
const handleMinLength = (
  minLength: number | NumRuleValues,
  label: string,
  field: string,
) => {
  if (
    (typeof minLength !== "number" &&
      (typeof minLength.value !== "number" || Number.isNaN(minLength))) ||
    (typeof minLength === "number" && minLength < 0)
  )
    throw new Error(`Field ${label} has invalid minLength value`);

  const length = typeof minLength === "number" ? minLength : minLength.value;

  const condition = field.length < length;
  const error =
    typeof minLength === "number" || !minLength.error
      ? `Field ${label} is shorter than ${length ?? "required"}`
      : minLength.error;

  return { condition, error };
};

// for maxlength
const handleMaxLength = (
  maxLength: number | NumRuleValues,
  label: string,
  field: string,
) => {
  if (
    (typeof maxLength !== "number" &&
      (typeof maxLength.value !== "number" || Number.isNaN(maxLength))) ||
    (typeof maxLength === "number" && maxLength < 0)
  )
    throw new Error(`Field ${label} has invalid maxLength value`);

  const length = typeof maxLength === "number" ? maxLength : maxLength.value;
  const condition = field.length > length;
  const error =
    typeof maxLength === "number" || !maxLength.error
      ? `Field ${label} is longer than ${length ?? "required"}`
      : maxLength.error;

  return { condition, error };
};

// for hasupper
const handleHasUpper = (
  hasUpper: boolean | BoolRuleValues,
  label: string,
  field: string,
) => {
  if (typeof hasUpper !== "boolean" && typeof hasUpper.value !== "boolean") {
    throw new Error(`Field ${label} has invalid hasUpper value`);
  }

  const cap = typeof hasUpper === "boolean" ? hasUpper : hasUpper.value;
  const regex = /[A-Z]/;
  const condition = cap ? !regex.test(field) : regex.test(field);
  const error =
    typeof hasUpper === "boolean" || !hasUpper.error
      ? `Field ${label} does not have an uppercase character`
      : hasUpper.error;

  return { condition, error };
};

// for haslower
const handleHasLower = (
  hasLower: boolean | BoolRuleValues,
  label: string,
  field: string,
) => {
  if (typeof hasLower !== "boolean" && typeof hasLower.value !== "boolean") {
    throw new Error(`Field ${label} has invalid hasLower value`);
  }

  const lower = typeof hasLower === "boolean" ? hasLower : hasLower.value;
  const regex = /[a-z]/;
  const condition = lower ? !regex.test(field) : regex.test(field);
  const error =
    typeof hasLower === "boolean" || !hasLower.error
      ? `Field ${label} does not have a lowercase character`
      : hasLower.error;

  return { condition, error };
};

// for hasSpecial
const handleHasSpecial = (
  hasSpecial: boolean | BoolRuleValues,
  label: string,
  field: string,
) => {
  if (
    typeof hasSpecial !== "boolean" &&
    typeof hasSpecial.value !== "boolean"
  ) {
    throw new Error(`Field ${label} has invalid hasSpecial value`);
  }

  const special =
    typeof hasSpecial === "boolean" ? hasSpecial : hasSpecial.value;
  const regex = /[^\w\s]/;
  const condition = special ? !regex.test(field) : regex.test(field);
  const error =
    typeof hasSpecial === "boolean" || !hasSpecial.error
      ? `Field ${label} does not have a special character`
      : hasSpecial.error;

  return { condition, error };
};

// for hasnum
const handleHasNum = (
  hasNum: boolean | BoolRuleValues,
  label: string,
  field: string,
) => {
  if (typeof hasNum !== "boolean" && typeof hasNum.value !== "boolean")
    throw new Error(`Field ${label} has invalid hasNum value`);

  const num = typeof hasNum === "boolean" ? hasNum : hasNum.value;
  const regex = /[0-9]/;
  const condition = num ? !regex.test(field) : regex.test(field);
  const error =
    typeof hasNum === "boolean" || !hasNum.error
      ? `Field ${label} does not have a number`
      : hasNum.error;

  return { condition, error };
};

// for equal
const handleEqual = (
  equal: string | StrRuleValues,
  label: string,
  field: string,
) => {
  if (typeof equal !== "string" && typeof equal.value !== "string")
    throw new Error(`Field ${label} has invalid equal value`);

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

  return { condition, error };
};

const handleCustom = (
  custom: boolfunc | CustomRuleValue,
  label: string,
  field: string,
) => {
  if (typeof custom !== "function" && typeof custom.value !== "function")
    throw new Error(`Field ${label} has invalid custom value`);

  const func = typeof custom === "function" ? custom : custom.value;
  const error =
    typeof custom !== "function"
      ? custom.error
      : `Field ${label} does not pass custom test`;
  const condition = !func(field);

  return { condition, error };
};
