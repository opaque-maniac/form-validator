import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";
import type { RuleConditions } from "../src/types";

const label = "email";
const validField = "johndoe@example.com";
const invalidField = "johndoeexample.com";
const rule: RuleConditions = {
  custom: (field: string) => field.includes("@"),
};

describe("Test the custom field with accurate input", () => {
  it("should pass if the custom field is accurate", () => {
    const { valid, errors } = validateField(label, validField, rule);
    expect(valid).toBe(true);
    expect(errors).toEqual([]);
  });

  it("should fail if the custom field is inaccurate", () => {
    const { valid, errors } = validateField(label, invalidField, rule);
    expect(valid).toBe(false);
    expect(errors).toEqual(["Field email does not pass custom test"]);
  });

  it("should fail if the custom field is inaccurate", () => {
    const { valid, errors } = validateField(label, invalidField, {
      custom: {
        value: (field: string) => field.includes("@"),
        error: "Field email does not pass",
      },
    });
    expect(valid).toBe(false);
    expect(errors).toEqual(["Field email does not pass"]);
  });
});

describe("Test the custom field with inaccurate input", () => {
  // number
  it("should throw an error if the custom field is a number", () => {
    expect(() =>
      validateField(label, validField, { custom: 1 as any }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an object value: number", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: 1 as any } }),
    ).toThrow("Field email has invalid custom value");
  });

  // string
  it("should throw an error if the custom field is a string", () => {
    expect(() =>
      validateField(label, validField, { custom: "" as any }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an object with value: string", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: "" as any } }),
    ).toThrow("Field email has invalid custom value");
  });

  // boolean
  it("should throw an error if the custom field is a boolean", () => {
    expect(() =>
      validateField(label, validField, { custom: true as any }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an object value: boolean", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: true as any } }),
    ).toThrow("Field email has invalid custom value");
  });

  // null
  it("should throw an error if the custom field is a null", () => {
    expect(validateField(label, validField, { custom: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });
  it("should throw an error if the custom field is an object value: null", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: null as any } }),
    ).toThrow("Field email has invalid custom value");
  });

  // undefined
  it("should throw an error if the custom field is undefined", () => {
    expect(
      validateField(label, validField, { custom: undefined as any }),
    ).toEqual({
      valid: true,
      errors: [],
    });
  });
  it("should throw an error if the custom field is an object value: undefined", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: undefined as any } }),
    ).toThrow("Field email has invalid custom value");
  });

  // Array
  it("should throw an error if the custom field is an empty array", () => {
    expect(() =>
      validateField(label, validField, { custom: [] as any }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an object with value: empty array", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: [] as any } }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an array", () => {
    expect(() =>
      validateField(label, validField, { custom: ["wee"] as any }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an object with value: array", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: ["wee"] as any } }),
    ).toThrow("Field email has invalid custom value");
  });

  // Object
  it("should throw an error if the custom field is an empty object", () => {
    expect(() =>
      validateField(label, validField, { custom: {} as any }),
    ).toThrow("Field email has invalid custom value");
  });
  it("should throw an error if the custom field is an object with value: {}", () => {
    expect(() =>
      validateField(label, validField, { custom: { value: {} as any } }),
    ).toThrow("Field email has invalid custom value");
  });
});
