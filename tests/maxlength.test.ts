import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

const label = "name";
const field = "John Doe";

describe("Testing maxLength field with acceptable input for the field", () => {
  it("should pass when maxLength is valid", () => {
    const result = validateField(label, field, { maxLength: 20 });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when maxLength is object with valid value property", () => {
    const result = validateField(label, field, { maxLength: { value: 20 } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when maxLength is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when maxLength is an object with value: number and error", () => {
    expect(
      validateField(label, field, {
        maxLength: { value: 20, error: "wee" },
      })
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain maxLength", () => {
    expect(validateField(label, field, { maxLength: 10 })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Testing the maxLength field with invalid field", () => {
  it("should return valid: false, and error: []str if sting in less that minLength", () => {
    const result = validateField(label, field, { maxLength: 5 });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} is longer than 5`],
    });
  });

  it("should return valid: false, and error: []str if sting in less that minLength", () => {
    const result = validateField(label, field, { maxLength: { value: 5 } });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} is longer than 5`],
    });
  });

  it("should return valid: false, and error: []str if sting in less that minLength", () => {
    const msg = `Field ${label} is too long man`;
    const result = validateField(label, field, {
      maxLength: { value: 5, error: msg },
    });
    expect(result).toEqual({
      valid: false,
      errors: [msg],
    });
  });
});

describe("Testing maxLength field with unacceptable rules for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if maxLength is a string", () => {
    expect(() =>
      validateField(label, field, { maxLength: "wee" as any })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: "wee" as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an empty string", () => {
    expect(() => validateField(label, field, { maxLength: "" as any })).toThrow(
      "invalid maxLength value"
    );
  });

  it("should throw an error if maxLength is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: "" as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is a regex", () => {
    expect(() =>
      validateField(label, field, { maxLength: /[A-Z]/ as any })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: /[A-Z]/ as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is a boolean", () => {
    expect(() =>
      validateField(label, field, { maxLength: true as any })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an object with value: boolean", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: true as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { maxLength: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if maxLength is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: null as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should return valid: true and errors:[] if maxLength is undefined", () => {
    expect(
      validateField(label, field, { maxLength: undefined as any })
    ).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if maxLength is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: undefined as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an empty object", () => {
    expect(() => validateField(label, field, { maxLength: {} as any })).toThrow(
      "invalid maxLength value"
    );
  });

  it("should throw an error if maxLength is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: {} as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an empty array", () => {
    expect(() => validateField(label, field, { maxLength: [] as any })).toThrow(
      "invalid maxLength value"
    );
  });

  it("should throw an error if maxLength is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: [] as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an array", () => {
    expect(() =>
      validateField(label, field, { maxLength: ["wee"] as any })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { maxLength: { value: ["wee"] as any } })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { maxLength: square as any })
    ).toThrow("invalid maxLength value");
  });

  it("should throw an error if maxLength is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { maxLength: { value: square as any } })
    ).toThrow("invalid maxLength value");
  });
});

describe("Testing the error message when the field does not match the pattern", () => {
  it("should return the provided error message for pattern", () => {
    const errorMessage = "Field name should only contain numbers";
    const result = validateField(label, field, {
      maxLength: { value: 2, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { maxLength: 2 })).toEqual({
      valid: false,
      errors: [`Field ${label} is longer than 2`],
    });
  });
});
