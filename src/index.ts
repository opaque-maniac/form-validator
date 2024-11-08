import { RuleObj } from "./types";
import { validateForm } from "./validateform";

const rules: RuleObj = {
  email: {
    required: { value: true, error: "Email is required" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "Invalid email format",
    },
  },
  password: {
    required: { value: true, error: "Password is required" },
    minLength: {
      value: 8,
      error: "Password must be at least 8 characters long",
    },
    hasCap: { value: true, error: "Password must contain an uppercase letter" },
    hasSpecial: {
      value: true,
      error: "Password must contain a special character",
    },
  },
};

const data = {
  email: "mbithimark8@gmail.com",
  password: "Caroline1992",
};

validateForm(data, rules);
