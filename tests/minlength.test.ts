import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

const label = "name";
const field = "John Doe";

describe("Testing minLength field with acceptable input for the field", () => {
  it("should pass when minLength is valid", () => {
    const result = validateField(label, field, { minLength: 1 });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when minLength is object with valid value property", () => {
    const result = validateField(label, field, { minLength: { value: 1 } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when minLength is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when minLength is an object with value: number and error", () => {
    expect(
      validateField(label, field, {
        minLength: { value: 1, error: "wee" },
      })
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain minLength", () => {
    expect(validateField(label, field, { maxLength: 10 })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Testing the minLength field with invalid field", () => {
  it("should return valid: false, and error: []str if sting in less that minLength", () => {
    const result = validateField(label, field, { minLength: 20 });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} is shorter than 20`],
    });
  });

  it("should return valid: false, and error: []str if sting in less that minLength", () => {
    const result = validateField(label, field, { minLength: { value: 20 } });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} is shorter than 20`],
    });
  });

  it("should return valid: false, and error: []str if sting in less that minLength", () => {
    const msg = `Field ${label} is too short man`;
    const result = validateField(label, field, {
      minLength: { value: 20, error: msg },
    });
    expect(result).toEqual({
      valid: false,
      errors: [msg],
    });
  });
});

describe("Testing minLength field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if minLength is a string", () => {
    expect(() =>
      validateField(label, field, { minLength: "wee" as any })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: "wee" as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an empty string", () => {
    expect(() => validateField(label, field, { minLength: "" as any })).toThrow(
      "invalid minLength value"
    );
  });

  it("should throw an error if minLength is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: "" as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is a regex", () => {
    expect(() =>
      validateField(label, field, { minLength: /[A-Z]/ as any })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: /[A-Z]/ as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is a boolean", () => {
    expect(() =>
      validateField(label, field, { minLength: true as any })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an object with value: boolean", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: true as any } })
    ).toThrow("invalid minLength value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { minLength: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if minLength is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: null as any } })
    ).toThrow("invalid minLength value");
  });

  it("should return valid: true and errors:[] if minLength is undefined", () => {
    expect(
      validateField(label, field, { minLength: undefined as any })
    ).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if minLength is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: undefined as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an empty object", () => {
    expect(() => validateField(label, field, { minLength: {} as any })).toThrow(
      "invalid minLength value"
    );
  });

  it("should throw an error if minLength is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: {} as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an empty array", () => {
    expect(() => validateField(label, field, { minLength: [] as any })).toThrow(
      "invalid minLength value"
    );
  });

  it("should throw an error if minLength is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: [] as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an array", () => {
    expect(() =>
      validateField(label, field, { minLength: ["wee"] as any })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { minLength: { value: ["wee"] as any } })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { minLength: square as any })
    ).toThrow("invalid minLength value");
  });

  it("should throw an error if minLength is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { minLength: { value: square as any } })
    ).toThrow("invalid minLength value");
  });
});

describe("Testing the error message when the field does not match the pattern", () => {
  it("should return the provided error message for pattern", () => {
    const errorMessage = "Field name should only contain numbers";
    const result = validateField(label, field, {
      minLength: { value: 20, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { minLength: 20 })).toEqual({
      valid: false,
      errors: [`Field ${label} is shorter than 20`],
    });
  });
});
