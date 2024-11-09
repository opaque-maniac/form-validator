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

  it("should throw an error if pattern is null", () => {
    expect(() => validateField(label, field, { pattern: null as any })).toThrow(
      "has invalid pattern value",
    );
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

  it("should throw an error if pattern is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { pattern: { value: ["wee"] as any } }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: undefined and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: undefined as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: null and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: null as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: empty object and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: {} as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: empty string and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: "" as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: number and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: 1 as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: empty array and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: [] as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });

  it("should throw an error if pattern is an object with value: array and error", () => {
    expect(() =>
      validateField(label, field, {
        pattern: { value: ["wee"] as any, error: "wee" },
      }),
    ).toThrow("has invalid pattern value");
  });
});
