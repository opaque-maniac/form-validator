/**
 * @group unit
 * @group validatefield
 * @group validatefield-test
 */

import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

describe("Testing required field with acceptable input for the required field", () => {
  const label = "name";
  const field = "John Doe";

  it("should return valid:true and errors:[] when required is a boolean", () => {
    const result = validateField(label, field, { required: true });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should return valid:true and errors: [] when required is an object", () => {
    const results = validateField(label, field, {
      required: { value: true },
    });
    expect(results).toEqual({ valid: true, errors: [] });
  });

  it("should return valid:true and errors:[] when required is false with valid field", () => {
    const result = validateField(label, field, { required: false });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should return valid:true and errors:[] when required is an object with value: false", () => {
    const result = validateField(label, "", { required: { value: false } });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should return valid:true and errors:[] when required is not in rules object", () => {
    const result = validateField(label, field, { minLength: 2 });
    expect(result).toEqual({ valid: true, errors: [] });
  });
});

describe("Testing required field with unacceptable input", () => {
  const label = "name";
  const field = "john doe";

  it("should throw an error if required is a string", () => {
    expect(() =>
      validateField(label, field, { required: "wee" as any }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an object with value: string", () => {
    expect(() =>
      validateField(label, field, { required: { value: "wee" as any } }),
    ).toThrow("has invalid required value");
  });

  it("should if throw an error if required is a number", () => {
    expect(() => validateField(label, field, { required: 1 as any })).toThrow(
      "has invalid required value",
    );
  });

  it("should if throw an error if required is an object with value: number", () => {
    expect(() =>
      validateField(label, field, { required: { value: 1 as any } }),
    ).toThrow("has invalid required value");
  });

  it("should return valid: true, errors:[] required is null", () => {
    expect(validateField(label, field, { required: null as any })).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("should throw an error if required is object with value: null", () => {
    expect(() =>
      validateField(label, field, { required: { value: null as any } }),
    ).toThrow("has invalid required value");
  });

  it("should if return valid:true and errors:[] if required is undefined", () => {
    expect(validateField(label, field, { required: undefined as any })).toEqual(
      {
        valid: true,
        errors: [],
      },
    );
  });

  it("should throw an error if required is object with value: undefined", () => {
    expect(() =>
      validateField(label, field, { required: { value: undefined as any } }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an empty object", () => {
    expect(() => validateField(label, field, { required: {} as any })).toThrow(
      "has invalid required value",
    );
  });

  it("should throw an error if required is an object with value: empty object", () => {
    expect(() =>
      validateField(label, field, { required: { value: {} as any } }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an empty string", () => {
    expect(() => validateField(label, field, { required: "" as any })).toThrow(
      "has invalid required value",
    );
  });

  it("should throw an error if required is an object with value: empty string", () => {
    expect(() =>
      validateField(label, field, { required: { value: "" as any } }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an empty array", () => {
    expect(() => validateField(label, field, { required: [] as any })).toThrow(
      "has invalid required value",
    );
  });

  it("should throw an error if required is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, { required: { value: [] as any } }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an array", () => {
    expect(() =>
      validateField(label, field, { required: ["wee"] as any }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an object with value: array", () => {
    expect(() =>
      validateField(label, field, { required: { value: ["wee"] as any } }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is a function", () => {
    const square = (x: number) => x * x;
    expect(() =>
      validateField(label, field, { required: square as any }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an object with value: function", () => {
    const square = (x: number) => x * x;
    expect(() =>
      validateField(label, field, { required: { value: square as any } }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is a regex", () => {
    const regex = /a/;
    expect(() =>
      validateField(label, field, { required: regex as any }),
    ).toThrow("has invalid required value");
  });

  it("should throw an error if required is an object with value: regex", () => {
    const regex = /a/;
    expect(() =>
      validateField(label, field, { required: { value: regex as any } }),
    ).toThrow("has invalid required value");
  });
});

describe("Testing error message returned if errorcode is passed with required", () => {
  const label = "name";

  it("should return valid:false and errors:[error] when required is true with invalid field and stated error", () => {
    const result = validateField(label, "", {
      required: { value: true, error: "Field is required" },
    });
    expect(result).toEqual({ valid: false, errors: ["Field is required"] });
  });

  it("should return valid:false and errors:[error] when required is true with invalid field and not stated error", () => {
    const result = validateField(label, "", {
      required: { value: true },
    });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} is required`],
    });
  });
});
