import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing hasSpecial field with acceptable input for the field", () => {
  const label = "name";
  const field = "John Do@";

  it("should pass when hasSpecial is valid", () => {
    const result = validateField(label, field, { hasSpecial: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasSpecial is object with valid value property", () => {
    const result = validateField(label, field, {
      hasSpecial: { value: true },
    });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasSpecial is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasSpecial is an object with value: boolean and error", () => {
    expect(
      validateField(label, field, {
        hasSpecial: { value: true, error: "wee" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain hasSpecial", () => {
    expect(validateField(label, field, { hasSpecial: true })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Test hasSpecial should fail if string does not have a special letter", () => {
  const label = "name";
  const field = "JOHN DOE";

  it("should fail when hasSpecial is invalid", () => {
    const result = validateField(label, field, { hasSpecial: true });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have a special character"],
    });
  });

  it("should fail when hasSpecial is object with invalid value property", () => {
    const result = validateField(label, field, {
      hasSpecial: { value: true },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have a special character"],
    });
  });

  it("should fail when hasSpecial is object with invalid value property", () => {
    const result = validateField(label, field, {
      hasSpecial: { value: true, error: "wee" },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["wee"],
    });
  });
});

describe("Testing hasSpecial field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if hasSpecial is a string", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: "wee" as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: "wee" as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an empty string", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: "" as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: "" as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is a regex", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: /[A-Z]/ as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: /[A-Z]/ as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is a number", () => {
    expect(() => validateField(label, field, { hasSpecial: 2 as any })).toThrow(
      "invalid hasSpecial value",
    );
  });

  it("should throw an error if hasSpecial is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: 0 as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { hasSpecial: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasSpecial is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: null as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should return valid: true and errors:[] if hasSpecial is undefined", () => {
    expect(
      validateField(label, field, { hasSpecial: undefined as any }),
    ).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasSpecial is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, {
        hasSpecial: { value: undefined as any },
      }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an empty object", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: {} as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: {} as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an empty array", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: [] as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: [] as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an array", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: ["wee"] as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { hasSpecial: { value: ["wee"] as any } }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasSpecial: square as any }),
    ).toThrow("invalid hasSpecial value");
  });

  it("should throw an error if hasSpecial is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasSpecial: { value: square as any } }),
    ).toThrow("invalid hasSpecial value");
  });
});

describe("Testing the error message when the field does not contain special", () => {
  const label = "name";
  const field = "JOHN DOE";

  it("should return the provided error message for special", () => {
    const errorMessage = "Field name should contain special";
    const result = validateField(label, field, {
      hasSpecial: { value: true, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { hasSpecial: true })).toEqual({
      valid: false,
      errors: ["Field name does not have a special character"],
    });
  });
});
