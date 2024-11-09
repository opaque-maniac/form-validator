import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";

const label = "name";
const field = "John Doe";

describe("Testing equal field with acceptable input for the field", () => {
  it("should return valid: true, errors:[] if equal is valid", () => {
    const result = validateField(label, field, { equal: field });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should return valid: true, errors:[] if equal is object with valid value property", () => {
    const result = validateField(label, field, {
      equal: { value: field },
    });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should return valid: true, errors:[] if equal is object with valid value property", () => {
    const msg = `Field ${label} is not equal to target`;
    const result = validateField(label, field, {
      equal: { value: field, error: msg },
    });
    expect(result).toEqual({ valid: true, errors: [] });
  });
});

describe("Testing the equal field with data that does not match", () => {
  it("should return valid: true, errors:[] if equal is valid", () => {
    const result = validateField(label, field, { equal: "not-equal" });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} not equal to not-equal`],
    });
  });

  it("should return valid: true, errors:[] if equal is valid", () => {
    const result = validateField(label, field, {
      equal: { value: "not-equal" },
    });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} not equal to not-equal`],
    });
  });

  it("should return valid: true, errors:[] if equal is object with valid value property", () => {
    const msg = `Field ${label} is not equal to target`;
    const result = validateField(label, field, {
      equal: { value: "not equal", error: msg },
    });
    expect(result).toEqual({ valid: false, errors: [msg] });
  });
});

describe("Test the equal field with invalid rule types", () => {
  // bool
  it("Should throw an error if equal is a boolean", () => {
    expect(() =>
      validateField(label, field, {
        equal: true as any,
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is an obj with value: boolean", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: true as any },
      })
    ).toThrow("has invalid equal value");
  });

  // num
  it("Should throw an error if equal is a number", () => {
    expect(() =>
      validateField(label, field, {
        equal: 2 as any,
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is an object with value: number", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: 2 as any },
      })
    ).toThrow("has invalid equal value");
  });

  // null
  it("should return valid: true, errors:[] if equal is null", () => {
    const result = validateField(label, field, { equal: null as any });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("Should throw an error if equal is an obj with value: null", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: null as any },
      })
    ).toThrow("has invalid equal value");
  });

  // undefined
  it("should return valid: true, errors:[] if equal is undefined", () => {
    const result = validateField(label, field, { equal: undefined as any });
    expect(result).toEqual({ valid: true, errors: [] });
  });
  it("Should throw an error if equal is an obj with value: undefined", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: undefined as any },
      })
    ).toThrow("has invalid equal value");
  });

  // obj
  it("Should throw an error if equal is an empty object", () => {
    expect(() =>
      validateField(label, field, {
        equal: {} as any,
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is an obj with value: {}", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: {} as any },
      })
    ).toThrow("has invalid equal value");
  });

  // array
  it("Should throw an error if equal is a an empty array", () => {
    expect(() =>
      validateField(label, field, {
        equal: [] as any,
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is an object with value: empty array", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: ["me"] as any },
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is a an array", () => {
    expect(() =>
      validateField(label, field, {
        equal: [] as any,
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is an object with value: array", () => {
    expect(() =>
      validateField(label, field, {
        equal: { value: ["you"] as any },
      })
    ).toThrow("has invalid equal value");
  });

  // func
  it("Should throw an error if equal is a function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, {
        equal: square as any,
      })
    ).toThrow("has invalid equal value");
  });
  it("Should throw an error if equal is an object with value: function", () => {
    const square = (x: number) => x * x;

    expect(() =>
      validateField(label, field, {
        equal: { value: square as any },
      })
    ).toThrow("has invalid equal value");
  });
});

describe("Testing error message returned if errorcode is passed with equal", () => {
  it("should return valid:false and errors:[error] when equal with invalid field and stated error", () => {
    const result = validateField(label, "", {
      equal: { value: "Not-equal", error: "Field is not equal" },
    });
    expect(result).toEqual({ valid: false, errors: ["Field is not equal"] });
  });

  it("should return valid:false and errors:[error] when equal with invalid field and not stated error", () => {
    const result = validateField(label, "", {
      equal: { value: "not-equal" },
    });
    expect(result).toEqual({
      valid: false,
      errors: [`Field ${label} not equal to not-equal`],
    });
  });
});
