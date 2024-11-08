import type { RuleObj } from "./types";
import validateForm from "./validateform";

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
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      error:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
};

const data = {
  email: "mbithimark8@gmail.com",
  password: "Carolineee@1992",
};

console.log(validateForm(data, rules));
