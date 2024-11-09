/**
 * @module validateField
 * @description micro library function for form field validation
 * Validate input field
 * @param {string} label - field label
 * @param {string} field - field value to validate
 * @param {RuleConditions} rule - validation rules for the field
 * @returns {ValidateFieldReturn} - object containing validation result
 */

import type { RuleConditions, ValidateFieldReturn } from "./types";

// Validate input field
export const validateField = (
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
    if (typeof required !== "boolean" && typeof required.value !== "boolean") {
      throw new Error(`Field ${label} has invalid required value`);
    }

    const isRequired =
      typeof required === "boolean" ? required : required.value;
    const condition = isRequired && !field;
    const error =
      typeof required === "boolean" || !required.error
        ? `Field ${label} is required`
        : required.error;

    addError(condition, error);
  } else {
    if (typeof required === "string" || typeof required === "number") {
      throw new Error(`Field ${label} has invalid required value`);
    }
  }

  if (pattern) {
    // see if pattern is not a regex or pattern.value is not a regex
    if (!(pattern instanceof RegExp) && !(pattern.value instanceof RegExp))
      throw new Error(`Field ${label} has invalid pattern value`);

    const regex = pattern instanceof RegExp ? pattern : pattern.value;

    const condition = !regex.test(field);
    const error =
      pattern instanceof RegExp || !pattern.error
        ? `Field ${label} has invalid format`
        : pattern.error;

    addError(condition, error);
  } else {
    if (typeof pattern === "string" || typeof pattern === "number")
      throw new Error(`Field ${label} has invalid pattern value`);
  }

  if (minLength) {
    if (
      (typeof minLength !== "number" &&
        (typeof minLength.value !== "number" || Number.isNaN(pattern))) ||
      (typeof minLength === "number" && minLength < 0)
    )
      throw new Error(`Field ${label} has invalid minLength value`);

    const length = typeof minLength === "number" ? minLength : minLength.value;

    const condition = field.length < length;
    const error =
      typeof minLength === "number" || !minLength.error
        ? `Field ${label} is shorter than ${length ?? "required"}`
        : minLength.error;

    addError(condition, error);
  } else {
    if (typeof minLength === "string" || typeof minLength === "number")
      throw new Error(`Field ${label} has invalid minLength value`);
  }

  if (maxLength) {
    if (
      (typeof maxLength !== "number" &&
        (typeof maxLength.value !== "number" || Number.isNaN(pattern))) ||
      (typeof maxLength === "number" && maxLength < 0)
    )
      throw new Error(`Field ${label} has invalid maxLength value`);

    const length = typeof maxLength === "number" ? maxLength : maxLength.value;
    const condition = field.length > length;
    const error =
      typeof maxLength === "number" || !maxLength.error
        ? `Field ${label} is longer than ${length ?? "required"}`
        : maxLength.error;

    addError(condition, error);
  } else {
    if (typeof maxLength === "string")
      throw new Error(`Field ${label} has invalid maxLength value`);
  }

  if (hasCap) {
    if (typeof hasCap !== "boolean" && typeof hasCap.value !== "boolean") {
      throw new Error(`Field ${label} has invalid hasCap value`);
    }

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
  } else {
    if (typeof hasCap === "string" || typeof hasCap === "number")
      throw new Error(`Field ${label} has invalid hasCap value`);
  }

  if (hasLower) {
    if (typeof hasLower !== "boolean" && typeof hasLower.value !== "boolean") {
      throw new Error(`Field ${label} has invalid hasLower value`);
    }

    const regex = /[a-z]/;
    const condition = !regex.test(field);
    const error =
      typeof hasLower === "boolean" || !hasLower.error
        ? `Field ${label} does not have a lowercase character`
        : hasLower.error;

    addError(condition, error);
  } else {
    // Empty string or zero
    if (typeof hasLower === "string" || typeof hasLower === "number")
      throw new Error(`Field ${label} has invalid hasLower value`);
  }

  if (hasSpecial) {
    if (
      typeof hasSpecial !== "boolean" &&
      typeof hasSpecial.value !== "boolean"
    ) {
      throw new Error(`Field ${label} has invalid hasSpecial value`);
    }

    const regex = /[^\w\s]/;
    const condition = !regex.test(field);
    const error =
      typeof hasSpecial === "boolean" || !hasSpecial.error
        ? `Field ${label} does not have a special character`
        : hasSpecial.error;

    addError(condition, error);
  } else {
    if (typeof hasSpecial === "string" || typeof hasSpecial === "number")
      throw new Error(`Field ${label} has invalid hasSpecial value`);
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
  } else {
    if (typeof hasNum === "string" || typeof hasNum === "number")
      throw new Error(`Field ${label} has invalid hasNum value`);
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
