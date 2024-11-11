import { describe, it, expect } from "vitest";
import { validateField } from "../src/validatefield";
import { RuleConditions } from "../src/types";

const label = "email";
const field = "test@example.com";

const validRules: RuleConditions = {
  required: { value: true },
  minLength: { value: 8, error: "Email should be longer than 4 characters" },
  hasSpecial: {
    value: true,
    error: "Email is does not have special characters",
  },
};

const invalidRules: RuleConditions = {
  required: { value: true },
  minLength: { value: 20, error: "Email should be longer than 4 characters" },
  hasSpecial: {
    value: false,
    error: "Email is does not have special characters",
  },
};

describe("Test the valdate field function with accurate data", () => {
  it("should pass when field is valid", () => {
    const result = validateField(label, field, validRules);
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should pass when rules is an empty object", () => {
    const result = validateField(label, field, {});
    expect(result).toEqual({ valid: true, errors: [] });
  });
});

describe("Test the valdate field function with invalid field data", () => {
  it("should pass when rules is an object with other values", () => {
    const result = validateField(label, field, { yes: true, no: false } as {});
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("should fail if passed the invalid rules object", () => {
    const results = validateField(label, field, invalidRules);
    expect(results).toEqual({
      valid: false,
      errors: [
        "Email should be longer than 4 characters",
        "Email is does not have special characters",
      ],
    });
  });
});

describe("Test the valdate field function with inaccurate types", () => {
  // number
  it("should throw an error if field is a number", () => {
    expect(() => validateField("email", 1 as any, { required: true })).toThrow(
      "Field is not a string",
    );
  });
  it("should throw an error if label is a number", () => {
    expect(() => validateField(1 as any, "email", { required: true })).toThrow(
      "Label is not a string",
    );
  });
  it("should throw an error if rule is a number", () => {
    expect(() => validateField("email", "email", 1 as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  // string
  it("should throw an error if rule is a string", () => {
    expect(() => validateField("email", "email", "we" as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  // boolean
  it("should throw an error if field is a boolean", () => {
    expect(() =>
      validateField("email", true as any, { required: true }),
    ).toThrow("Field is not a string");
  });
  it("should throw an error if label is a boolean", () => {
    expect(() =>
      validateField(true as any, "email", { required: true }),
    ).toThrow("Label is not a string");
  });
  it("should throw an error if rule is a boolean", () => {
    expect(() => validateField("email", "email", true as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  // Array
  it("should throw an error if field is an empty array", () => {
    expect(() => validateField("email", [] as any, { required: true })).toThrow(
      "Field is not a string",
    );
  });
  it("should throw an error if label is an empty array", () => {
    expect(() => validateField([] as any, "email", { required: true })).toThrow(
      "Label is not a string",
    );
  });
  it("should throw an error if rule is an empty array", () => {
    expect(() => validateField("email", "email", [] as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  it("should throw an error if field is array", () => {
    expect(() =>
      validateField("email", ["wee"] as any, { required: true }),
    ).toThrow("Field is not a string");
  });
  it("should throw an error if label is array", () => {
    expect(() =>
      validateField(["wee"] as any, "email", { required: true }),
    ).toThrow("Label is not a string");
  });
  it("should throw an error if rule is array", () => {
    expect(() => validateField("email", "email", ["wee"] as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  // Function
  it("should throw an error if label is a function", () => {
    const square = (x: number) => x * x;
    expect(() => validateField(square as any, "email", {})).toThrow(
      "Label is not a string",
    );
  });
  it("should throw an error if field is a function", () => {
    const square = (x: number) => x * x;
    expect(() => validateField("email", square as any, {})).toThrow(
      "Field is not a string",
    );
  });
  it("should throw an error if rule is a function", () => {
    const square = (x: number) => x * x;
    expect(() => validateField("email", "email", square as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  // object
  it("should throw an error if label is an object", () => {
    expect(() => validateField({} as any, "email", {})).toThrow(
      "Label is not a string",
    );
  });
  it("should throw an error if field is a function", () => {
    expect(() => validateField("email", {} as any, {})).toThrow(
      "Field is not a string",
    );
  });
  it("should pass if rule is an empty object", () => {
    expect(validateField("email", "email", {})).toEqual({
      valid: true,
      errors: [],
    });
  });
  it("should pass if rule is an object with invalid fields", () => {
    expect(
      validateField("email", "email", {
        no: true as any,
        yes: false as any,
      } as {}),
    ).toEqual({
      valid: true,
      errors: [],
    });
  });

  // null
  it("should throw an error if label is null", () => {
    expect(() => validateField(null as any, "email", {})).toThrow(
      "Label is not a string",
    );
  });
  it("should throw an error if field is null", () => {
    expect(() => validateField("email", null as any, {})).toThrow(
      "Field is not a string",
    );
  });
  it("should throw an error if rule is null", () => {
    expect(() => validateField("email", "email", null as any)).toThrow(
      "Field email has invalid rule",
    );
  });

  // undefined
  it("should throw an error if label is undefined", () => {
    expect(() => validateField(undefined as any, "email", {})).toThrow(
      "Label is not a string",
    );
  });
  it("should throw an error if field is undefined", () => {
    expect(() => validateField("email", undefined as any, {})).toThrow(
      "Field is not a string",
    );
  });
  it("should throw an error if rule is undefined", () => {
    expect(() => validateField("email", "email", undefined as any)).toThrow(
      "Field email has invalid rule",
    );
  });
});
