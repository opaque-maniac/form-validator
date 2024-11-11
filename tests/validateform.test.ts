import { it, describe, expect } from "vitest";
import { validateForm } from "../src/validateform";
import type { RuleObj } from "../src/types";

describe("Testing validate form with acceptable input for the required field", () => {
  const rules: RuleObj = {
    email: {
      hasSpecial: {
        value: true,
        error: "Email is does not have special characters",
      },
      minLength: {
        value: 8,
        error: "Email should be longer than 4 characters",
      },
    },
  };

  const biggerRules: RuleObj = {
    ...rules,
    firstName: {
      required: { value: true, error: "First name is required" },
      minLength: {
        value: 3,
        error: "First name should be longer than 3 characters",
      },
    },
    lastName: {
      required: { value: true, error: "Last name is required" },
      minLength: {
        value: 3,
        error: "Last name should be longer than 3 characters",
      },
    },
  };

  const validEmailData = {
    email: "mbithimark8@gmail.com",
  };

  const biggerForm = {
    ...validEmailData,
    firstName: "Marcus",
    lastName: "Browley",
  };

  const invalidEmailData = {
    email: "mcom",
  };

  const invalidBiggerForm = {
    ...invalidEmailData,
    firstName: "Ma",
    lastName: "Br",
  };

  it("should return valid: true, errors: {} when data and rules are empty objects", () => {
    expect(validateForm({}, {})).toEqual({ valid: true, errors: {} });
  });

  it("should return valid: true, errors: {email: []} when passed with valid form and rules", () => {
    expect(validateForm(validEmailData, rules)).toEqual({
      valid: true,
      errors: {
        email: [],
      },
    });
  });

  it("should return valid: true, errors: {} when passed with valid form and empty obj rules", () => {
    expect(validateForm(validEmailData, {})).toEqual({
      valid: true,
      errors: {},
    });
  });

  it("should return valid: true, errors: {} when passed with empty obj form and valid rules", () => {
    expect(validateForm({}, rules)).toEqual({
      valid: true,
      errors: {},
    });
  });

  it("should return valid: false and errors: {email: []} when passed with invalid form and valid rules", () => {
    expect(validateForm(invalidEmailData, rules)).toEqual({
      valid: false,
      errors: {
        email: [
          "Email should be longer than 4 characters",
          "Email is does not have special characters",
        ],
      },
    });
  });

  it("should return valid: true and errors: {} when passed with valid form and invalid rules", () => {
    expect(
      validateForm({ name: "Welcome" }, { email: { required: true } }),
    ).toEqual({
      valid: true,
      errors: {},
    });
  });

  it("should return valid: true, errors: {} when data and rules are bigger and valid", () => {
    expect(validateForm(biggerForm, biggerRules)).toEqual({
      valid: true,
      errors: {
        email: [],
        firstName: [],
        lastName: [],
      },
    });
  });

  it("should retun valid: false, and errors: {} with values for fields", () => {
    expect(validateForm(invalidBiggerForm, biggerRules)).toEqual({
      valid: false,
      errors: {
        email: [
          "Email should be longer than 4 characters",
          "Email is does not have special characters",
        ],
        firstName: ["First name should be longer than 3 characters"],
        lastName: ["Last name should be longer than 3 characters"],
      },
    });
  });
});

describe("Testing if the function throws an error if any of the parameters are not objects", () => {
  // string
  it("should throw an error if data is a string", () => {
    expect(() => validateForm("string" as any, {})).toThrow(
      "must be an object",
    );
  });
  it("should throw an error if rules is a string", () => {
    expect(() => validateForm({}, "string" as any)).toThrow(
      "must be an object",
    );
  });

  // Number
  it("should throw an error if data is a string", () => {
    expect(() => validateForm(1 as any, { email: { required: true } })).toThrow(
      "must be an object",
    );
  });
  it("should throw an error if rules is a number", () => {
    expect(() => validateForm({}, 1 as any)).toThrow("must be an object");
  });

  // boolean
  it("should throw an error if the data is boolean", () => {
    expect(() =>
      validateForm(true as any, { email: { required: true } }),
    ).toThrow("must be an object");
  });
  it("should throw an error if rules is boolean", () => {
    expect(() => validateForm({}, true as any)).toThrow("must be an object");
  });

  // Array
  it("should throw an error if data is an empty array", () => {
    expect(() =>
      validateForm([] as any, { email: { required: true } }),
    ).toThrow("must be an object");
  });
  it("should throw an error if rules is an empty array", () => {
    expect(() => validateForm({}, [] as any)).toThrow("must be an object");
  });
  it("should throw an error if data is an array with data", () => {
    expect(() =>
      validateForm(["data"] as any, { email: { required: true } }),
    ).toThrow("must be an object");
  });
  it("should throw an error if rules is an array with data", () => {
    expect(() => validateForm({}, ["data"] as any)).toThrow(
      "must be an object",
    );
  });

  // Function
  const sqaure = (x: number) => x * x;

  it("should throw an error if data is a function", () => {
    expect(() =>
      validateForm(sqaure as any, { email: { required: true } }),
    ).toThrow("must be an object");
  });
  it("should throw an error if rules is a function", () => {
    expect(() => validateForm({}, sqaure as any)).toThrow("must be an object");
  });

  // undefined
  it("should throw an error if data is undefined", () => {
    expect(() =>
      validateForm(undefined as any, { email: { required: true } }),
    ).toThrow("must be an object");
  });
  it("should throw an error if rules is undefined", () => {
    expect(() => validateForm({}, undefined as any)).toThrow(
      "must be an object",
    );
  });

  // null
  it("should throw an error if data is null", () => {
    expect(() =>
      validateForm(null as any, { email: { required: true } }),
    ).toThrow("must be an object");
  });
  it("should throw an error if rules is null", () => {
    expect(() => validateForm({}, null as any)).toThrow("must be an object");
  });
});
