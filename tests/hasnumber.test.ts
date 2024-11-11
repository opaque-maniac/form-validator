import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing hasNum field with acceptable input for the field", () => {
  const label = "name";
  const field = "John D0e";

  it("should pass when hasNum is valid", () => {
    const result = validateField(label, field, { hasNum: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasNum is object with valid value property", () => {
    const result = validateField(label, field, {
      hasNum: { value: true },
    });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasNum is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasNum is an object with value: boolean and error", () => {
    expect(
      validateField(label, field, {
        hasNum: { value: true, error: "wee" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain hasNum", () => {
    expect(validateField(label, field, { hasNum: true })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Test hasNum should fail if string does not have a number", () => {
  const label = "name";
  const field = "JOHN DOE";

  it("should pass if hasNum is false", () => {
    const results = validateField(label, field, { hasNum: false });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should pass if hasNum is object with value: false", () => {
    const results = validateField(label, field, { hasNum: { value: false } });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should fail when hasNum is invalid", () => {
    const result = validateField(label, field, { hasNum: true });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have a number"],
    });
  });

  it("should fail when hasNum is object with invalid value property", () => {
    const result = validateField(label, field, {
      hasNum: { value: true },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have a number"],
    });
  });

  it("should fail when hasNum is object with invalid value property", () => {
    const result = validateField(label, field, {
      hasNum: { value: true, error: "wee" },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["wee"],
    });
  });
});

describe("Testing hasNum field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if hasNum is a string", () => {
    expect(() => validateField(label, field, { hasNum: "wee" as any })).toThrow(
      "invalid hasNum value",
    );
  });

  it("should throw an error if hasNum is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: "wee" as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an empty string", () => {
    expect(() => validateField(label, field, { hasNum: "" as any })).toThrow(
      "invalid hasNum value",
    );
  });

  it("should throw an error if hasNum is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: "" as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is a regex", () => {
    expect(() =>
      validateField(label, field, { hasNum: /[A-Z]/ as any }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: /[A-Z]/ as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is a number", () => {
    expect(() => validateField(label, field, { hasNum: 2 as any })).toThrow(
      "invalid hasNum value",
    );
  });

  it("should throw an error if hasNum is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: 0 as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { hasNum: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasNum is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: null as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should return valid: true and errors:[] if hasNum is undefined", () => {
    expect(validateField(label, field, { hasNum: undefined as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasNum is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, {
        hasNum: { value: undefined as any },
      }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an empty object", () => {
    expect(() => validateField(label, field, { hasNum: {} as any })).toThrow(
      "invalid hasNum value",
    );
  });

  it("should throw an error if hasNum is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: {} as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an empty array", () => {
    expect(() => validateField(label, field, { hasNum: [] as any })).toThrow(
      "invalid hasNum value",
    );
  });

  it("should throw an error if hasNum is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: [] as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an array", () => {
    expect(() =>
      validateField(label, field, { hasNum: ["wee"] as any }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { hasNum: { value: ["wee"] as any } }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasNum: square as any }),
    ).toThrow("invalid hasNum value");
  });

  it("should throw an error if hasNum is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasNum: { value: square as any } }),
    ).toThrow("invalid hasNum value");
  });
});

describe("Testing the error message when the field does not contain numbers", () => {
  const label = "name";
  const field = "JOHN DOE";

  it("should return the provided error message for numbers", () => {
    const errorMessage = "Field name should contain numbers";
    const result = validateField(label, field, {
      hasNum: { value: true, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { hasNum: true })).toEqual({
      valid: false,
      errors: ["Field name does not have a number"],
    });
  });
});
