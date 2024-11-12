# form-validator

Simple form validator micro library written in typescript

## Installation
Run this command from your project root.

```bash
npm install opaque-maniac/form-validator
```

## Usage
## Form Validator
```typescript
import { validateForm } from 'form-validator';

const {valid, errors} = validateForm(formObj, ruleObj);
```

### Form Object
The `formObj` is an object that contains the form data. It has the following properties:
```typescript
{
    [key: string]: string
}
```
The key is the name of the field and the value is the value of the field.
Example:
```typescript
{
    username: 'john_doe',
    password: 'password123',
    email: 'example@test.com'
}
```

### Rule Object
The `ruleObj` is an object that contains the rules for the form fields. It has the following properties:
```typescript
{
    [key: string]: Rule
}
```
- The key is the name of the field and the value is the rule object.
- The __Rule__ object is an object that contains the rules for the field with a key which is the name of the rule and the value is the value of the rule.
- It has the following properties:

1. **required**:
```typescript
boolean | { value: boolean, error?: string }
```
2. **pattern**:
```typescript
RegExp | { value: RegExp, error?: string }
```
3. **minLength**:
```typescript
number | { value: number, error?: string }
```
4. **maxLength**:
```typescript
number | { value: number, error?: string }
```
5. **hasUpper**:
```typescript
boolean | { value: boolean, error?: string }
```
6. **hasLower**:
```typescript
boolean | { value: boolean, error?: string }
```
7. **hasNumber**:
```typescript
boolean | { value: boolean, error?: string }
```
8. hasSpecial:
```typescript
boolean | { value: boolean, error?: string }
```
9. equal:
```typescript
string | { value: string, error?: string }
```
10. custom:
```typescript
(value: string) => boolean | { value: (value: string) => boolean, error?: string }
```
__The error property is optional. If none is provided a default error will show__

Example:
```typescript
{
    username: {
        required: { value: true, error: 'Username is required' },
        minLength: { value: 3, error: 'Username must be at least 3 characters' },
        maxLength: { value: 20, error: 'Username must be at most 20 characters' },
        pattern: { value: /^[a-zA-Z0-9_]+$/, error: 'Username must contain only letters, numbers and underscores' }
    },
    password: {
        required: { value: true, error: 'Password is required' },
        minLength: { value: 8, error: 'Password must be at least 8 characters' },
        maxLength: { value: 20, error: 'Password must be at most 20 characters' },
        hasUpper: { value: true, error: 'Password must contain at least one uppercase letter' },
        hasLower: { value: true, error: 'Password must contain at least one lowercase letter' },
        hasNumber: { value: true, error: 'Password must contain at least one number' },
        hasSpecial: { value: true, error: 'Password must contain at least one special character' }
    },
    email: {
        required: { value: true, error: 'Email is required' },
        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, error: 'Email is invalid' }
    }
}
```
- The above example shows the rules for a form with username, password and email fields.
- The requred rule is if a field is required or not.
- The pattern rule is a regular expression that the field must match.
- The minLength and maxLength rules are the minimum and maximum length of the field.
- The hasUpper, hasLower, hasNumber and hasSpecial rules are for password fields to check if the password contains at least one uppercase letter, lowercase letter, number and special character.
- The equal rule is for password confirmation fields to check if the field is equal to the value of the field.

### Return Value
The `formValidator` function returns an object of type:
```typescript
{
    valid: boolean,
    errors: {
        [key: string]: string[]
    }
}
```

- The `valid` property is a boolean that indicates if the form is valid or not.
- The `errors` property is an object that contains the errors for the fields. The key is the name of the field and the value is an array of error messages.

Example:
```typescript
{
    valid: true,
    errors: {
        username: [],
        password: [],
        email: []
    },
}
```
```typescript
{
    valid: false,
    errors: {
        username: ['Username must be at least 3 characters', 'Username must contain only letters, numbers and underscores'],
        password: ['Password must contain at least one uppercase letter', 'Password must contain at least one special character'],
        email: ['Email is invalid']
    }
}
```

## Field Validator
You can also just verify one individual field.
```typescript
import { validateField } from 'form-validator';

const {valid, errors} = validateField(label, field, rules);
```

### Label
- The `label` is a string that represents the name of the field.
- It is mostly used to generate the default error messages and is __required__.

### Field
- The `field` is a string that represents the value of the field.
- It is __required__.

### Rules
- The `rules` is an object that contains the rules for the field.
- It is the same as the __Rule__ object in the __Rule Object__.
- It is __required__.
- An empty object can be passed if no rules are needed.
- If invalid rules are function, the function will return valid as true and no errors.
- If invalid data types are passed, it will throw an error.

Example:
```typescript
const {valid, errors} = validateField('Username', 'john_doe', {
    required: { value: true, error: 'Username is required' },
    minLength: { value: 3, error: 'Username must be at least 3 characters' },
    maxLength: { value: 20, error: 'Username must be at most 20 characters' },
    pattern: { value: /^[a-zA-Z0-9_]+$/, error: 'Username must contain only letters, numbers and underscores' }
});
```

### Return Value
The `fieldValidator` function returns an object of type:
```typescript
{
    valid: boolean,
    errors: string[]
}
```

- The `valid` property is a boolean that indicates if the field is valid or not.
- The `errors` property is an array of error messages.

Example:
```typescript
{
    valid: true,
    errors: []
}
```
```typescript
{
    valid: false,
    errors: ['Username must be at least 3 characters', 'Username must contain only letters, numbers and underscores']
}
```

The validateField function is actually being used in the formValidator function to validate each field.
