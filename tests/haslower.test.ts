import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing hasLower field with acceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should pass when hasLower is valid", () => {
    const result = validateField(label, field, { hasLower: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasLower is object with valid value property", () => {
    const result = validateField(label, field, { hasLower: { value: true } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasLower is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasLower is an object with value: number and error", () => {
    expect(
      validateField(label, field, {
        hasLower: { value: true, error: "wee" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain hasLower", () => {
    expect(validateField(label, field, { hasLower: true })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Test hasLower should fail if string does not have a lower letter", () => {
  const label = "name";
  const field = "JOHN DOE";

  it("should pass when haslower is false", () => {
    const results = validateField(label, field, { hasLower: false });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should pass when haslower is object with value: false", () => {
    const results = validateField(label, field, { hasLower: { value: false } });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should fail when hasLower is invalid", () => {
    const result = validateField(label, field, { hasLower: true });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have a lowercase character"],
    });
  });

  it("should fail when hasLower is object with invalid value property", () => {
    const result = validateField(label, field, {
      hasLower: { value: true },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have a lowercase character"],
    });
  });

  it("should fail when hasLower is object with invalid value property", () => {
    const result = validateField(label, field, {
      hasLower: { value: true, error: "wee" },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["wee"],
    });
  });
});

describe("Testing hasLower field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if hasLower is a string", () => {
    expect(() =>
      validateField(label, field, { hasLower: "wee" as any }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: "wee" as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an empty string", () => {
    expect(() => validateField(label, field, { hasLower: "" as any })).toThrow(
      "has invalid hasLower value",
    );
  });
  it("should throw an error if hasLower is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: "" as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is a regex", () => {
    expect(() =>
      validateField(label, field, { hasLower: /[A-Z]/ as any }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: /[A-Z]/ as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is a number", () => {
    expect(() => validateField(label, field, { hasLower: 2 as any })).toThrow(
      "has invalid hasLower value",
    );
  });

  it("should throw an error if hasLower is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: 0 as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { hasLower: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasLower is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: null as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should return valid: true and errors:[] if hasLower is undefined", () => {
    expect(validateField(label, field, { hasLower: undefined as any })).toEqual(
      {
        valid: true,
        errors: [],
      },
    );
  });

  it("should throw an error if hasLower is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: undefined as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an empty object", () => {
    expect(() => validateField(label, field, { hasLower: {} as any })).toThrow(
      "has invalid hasLower value",
    );
  });

  it("should throw an error if hasLower is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: {} as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an empty array", () => {
    expect(() => validateField(label, field, { hasLower: [] as any })).toThrow(
      "has invalid hasLower value",
    );
  });

  it("should throw an error if hasLower is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: [] as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an array", () => {
    expect(() =>
      validateField(label, field, { hasLower: ["wee"] as any }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { hasLower: { value: ["wee"] as any } }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasLower: square as any }),
    ).toThrow("has invalid hasLower value");
  });

  it("should throw an error if hasLower is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasLower: { value: square as any } }),
    ).toThrow("has invalid hasLower value");
  });
});

describe("Testing the error message when the field does not contain lower", () => {
  const label = "name";
  const field = "JOHN DOE";

  it("should return the provided error message for lowercase", () => {
    const errorMessage = "Field name should contain lowercase";
    const result = validateField(label, field, {
      hasLower: { value: true, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { hasLower: true })).toEqual({
      valid: false,
      errors: ["Field name does not have a lowercase character"],
    });
  });
});
