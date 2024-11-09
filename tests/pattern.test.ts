import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing pattern field with acceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";
  const pattern = /^[a-zA-Z ]+$/;

  it("should pass when pattern is a regex", () => {
    const result = validateField(label, field, { pattern });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when pattern is an object with value: regex", () => {
    const result = validateField(label, field, { pattern: { value: pattern } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when pattern is not provided", () => {
    const result = validateField(label, field, {});
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when pattern is an object with value: regex and error", () => {
    expect(
      validateField(label, field, {
        pattern: { value: pattern, error: "wee" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });
});

describe("Testing pattern field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if pattern is a string", () => {
    expect(() =>
      validateField(label, field, { pattern: "wee" as any }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: "wee" as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an empty string", () => {
    expect(() => validateField(label, field, { pattern: "" as any })).toThrow(
      "has invalid pattern value",
    );
  });

  it("should throw an error if pattern is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: "" as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is a number", () => {
    expect(() => validateField(label, field, { pattern: 1 as any })).toThrow(
      "has invalid pattern value",
    );
  });

  it("should throw an error if pattern is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: 1 as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is a boolean", () => {
    expect(() => validateField(label, field, { pattern: true as any })).toThrow(
      "has invalid pattern value",
    );
  });

  it("should throw an error if pattern is an object with value: boolean", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: true as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { pattern: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if pattern is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: null as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should return valid: true and errors:[] if pattern is undefined", () => {
    expect(validateField(label, field, { pattern: undefined as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if pattern is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: undefined as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an empty object", () => {
    expect(() => validateField(label, field, { pattern: {} as any })).toThrow(
      "has invalid pattern value",
    );
  });

  it("should throw an error if pattern is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: {} as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an empty array", () => {
    expect(() => validateField(label, field, { pattern: [] as any })).toThrow(
      "has invalid pattern value",
    );
  });

  it("should throw an error if pattern is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: [] as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an array", () => {
    expect(() =>
      validateField(label, field, { pattern: ["wee"] as any }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: ["wee"] as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { pattern: square as any }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { pattern: { value: square as any } }),
    ).toThrow("has invalid pattern value");
  });
});

describe("Testing the error message when the field does not match the pattern", () => {
  const label = "name";
  const field = "John Doe";
  const wrongRegex = /^[0-9]+$/;

  it("should return the provided error message for pattern", () => {
    const errorMessage = "Field name should only contain numbers";
    const result = validateField(label, field, {
      pattern: { value: wrongRegex, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { pattern: wrongRegex })).toEqual({
      valid: false,
      errors: [`Field ${label} has invalid format`],
    });
  });
});
