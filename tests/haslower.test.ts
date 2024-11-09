import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing hasCap field with acceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should pass when hasCap is valid", () => {
    const result = validateField(label, field, { hasCap: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasCap is object with valid value property", () => {
    const result = validateField(label, field, { hasCap: { value: true } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasCap is not provided", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when hasCap is an object with value: number and error", () => {
    expect(
      validateField(label, field, {
        hasCap: { value: true, error: "wee" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });

  it("should pass if object for rules does not contain hasCap", () => {
    expect(validateField(label, field, { hasCap: true })).toEqual({
      valid: true,
      errors: [],
    });
  });
});

describe("Test hasCap should fail if string does not have a capital letter", () => {
  const label = "name";
  const field = "John Doe";

  it("should fail when hasCap is invalid", () => {
    const result = validateField(label, "john doe", { hasCap: true });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have an uppercase character"],
    });
  });

  it("should fail when hasCap is object with invalid value property", () => {
    const result = validateField(label, "john doe", {
      hasCap: { value: true },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["Field name does not have an uppercase character"],
    });
  });

  it("should fail when hasCap is object with invalid value property", () => {
    const result = validateField(label, "john doe", {
      hasCap: { value: true, error: "wee" },
    });
    expect(result).toEqual({
      valid: false,
      errors: ["wee"],
    });
  });
});

describe("Testing hasCap field with unacceptable input for the field", () => {
  const label = "name";
  const field = "John Doe";

  it("should throw an error if hasCap is a string", () => {
    expect(() => validateField(label, field, { hasCap: "wee" as any })).toThrow(
      "invalid hasCap value",
    );
  });

  it("should throw an error if hasCap is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: "wee" as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an empty string", () => {
    expect(() => validateField(label, field, { hasCap: "" as any })).toThrow(
      "invalid hasCap value",
    );
  });

  it("should throw an error if hasCap is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: "" as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is a regex", () => {
    expect(() =>
      validateField(label, field, { hasCap: /[A-Z]/ as any }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an object with value: regex", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: /[A-Z]/ as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is a number", () => {
    expect(() => validateField(label, field, { hasCap: 2 as any })).toThrow(
      "invalid hasCap value",
    );
  });

  it("should throw an error if hasCap is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: 0 as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should return valid:true, errors:[] when required null", () => {
    expect(validateField(label, field, { hasCap: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasCap is an object with value: null", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: null as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should return valid: true and errors:[] if hasCap is undefined", () => {
    expect(validateField(label, field, { hasCap: undefined as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if hasCap is an object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: undefined as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an empty object", () => {
    expect(() => validateField(label, field, { hasCap: {} as any })).toThrow(
      "invalid hasCap value",
    );
  });

  it("should throw an error if hasCap is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: {} as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an empty array", () => {
    expect(() => validateField(label, field, { hasCap: [] as any })).toThrow(
      "invalid hasCap value",
    );
  });

  it("should throw an error if hasCap is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: [] as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an array", () => {
    expect(() =>
      validateField(label, field, { hasCap: ["wee"] as any }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { hasCap: { value: ["wee"] as any } }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasCap: square as any }),
    ).toThrow("invalid hasCap value");
  });

  it("should throw an error if hasCap is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, { hasCap: { value: square as any } }),
    ).toThrow("invalid hasCap value");
  });
});

describe("Testing the error message when the field does not contain capital", () => {
  const label = "name";
  const field = "john doe";

  it("should return the provided error message for pattern", () => {
    const errorMessage = "Field name should contain capital";
    const result = validateField(label, field, {
      hasCap: { value: true, error: errorMessage },
    });
    expect(result).toEqual({ valid: false, errors: [errorMessage] });
  });

  it("should return generic error message", () => {
    expect(validateField(label, field, { hasCap: true })).toEqual({
      valid: false,
      errors: ["Field name does not have an uppercase character"],
    });
  });
});
