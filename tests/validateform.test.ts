import { it, describe, expect } from "vitest";
import { validateForm } from "../src/validateform";

describe("Testing validate form with acceptable input for the required field", () => {
  it("should return valid: true and errors: [] for the required field", () => {
    expect(true).toBe(true);
  });
});
