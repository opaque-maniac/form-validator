import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing hasUpper field with acceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should pass when hasUpper is valid", () => {
    const result = validateField(label, field, { hasUpper: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasUpper is object with valid value property", () => {
    const result = validateField(label, field, { hasUpper: { value: true } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasUpper is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasUpper is an object with value: number and error", () => {
    expect(
      validateField(label, field, {
        hasUpper: { value: true, error: "wee" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain hasCap", () => {
    expect(validateField(label, field, { hasUpper: true })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Test hasUpper should fail if string does not have a capital letter", () => {
  const label = "name";

  it("should pass if hasUpper is false", () => {
    const results = validateField(label, "john doe", { hasUpper: false });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should pass if hasUpper is object with value: false", () => {
    const results = validateField(label, "john doe", {
      hasUpper: { value: false },
    });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should fail when hasUpper is invalid", () => {
    const result = validateField(label, "john doe", { hasUpper: true });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have an uppercase character"],
    });
  });

  it("should fail when hasUpper is object with invalid value property", () => {
    const result = validateField(label, "john doe", {
      hasUpper: { value: true },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have an uppercase character"],
    });
  });

  it("should fail when hasUpper is object with invalid value property", () => {
    const result = validateField(label, "john doe", {
      hasUpper: { value: true, error: "wee" },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["wee"],
    });
  });
});

describe("Testing hasUpper field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if hasUpper is a string", () => {
    expect(() =>
      validateField(label, field, { hasUpper: "wee" as any }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: "wee" as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an empty string", () => {
    expect(() => validateField(label, field, { hasUpper: "" as any })).toThrow(
      "invalid hasUpper value",
    );
  });

  it("should throw an error if hasUpper is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: "" as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is a regex", () => {
    expect(() =>
      validateField(label, field, { hasUpper: /[A-Z]/ as any }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: /[A-Z]/ as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is a number", () => {
    expect(() => validateField(label, field, { hasUpper: 2 as any })).toThrow(
      "invalid hasUpper value",
    );
  });

  it("should throw an error if hasUpper is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: 0 as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { hasUpper: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasUpper is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: null as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should return valid: true and errors:[] if hasUpper is undefined", () => {
    expect(validateField(label, field, { hasUpper: undefined as any })).toEqual(
      {
        valid: true,
        errors: [],
      },
    );
  });

  it("should throw an error if hasUpper is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: undefined as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an empty object", () => {
    expect(() => validateField(label, field, { hasUpper: {} as any })).toThrow(
      "invalid hasUpper value",
    );
  });

  it("should throw an error if hasUpper is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: {} as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an empty array", () => {
    expect(() => validateField(label, field, { hasUpper: [] as any })).toThrow(
      "invalid hasUpper value",
    );
  });

  it("should throw an error if hasUpper is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: [] as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an array", () => {
    expect(() =>
      validateField(label, field, { hasUpper: ["wee"] as any }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { hasUpper: { value: ["wee"] as any } }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasUpper: square as any }),
    ).toThrow("invalid hasUpper value");
  });

  it("should throw an error if hasUpper is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasUpper: { value: square as any } }),
    ).toThrow("invalid hasUpper value");
  });
});

describe("Testing the error message when the field does not contain capital", () => {
  const label = "name";
  const field = "john doe";

  it("should return the provided error message for capital", () => {
    const errorMessage = "Field name should contain capital";
    const result = validateField(label, field, {
      hasUpper: { value: true, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { hasUpper: true })).toEqual({
      valid: false,
      errors: ["Field name does not have an uppercase character"],
    });
  });
});
