# form-validator

Simple form validator micro library written in typescript

## Installation
_Installing is not possible because it isn't published yet_

## Usage
## Form Validator
```typescript
import { formValidator } from 'form-validator';

const {valid, errors} = formValidator(formObj, ruleObj);
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
The key is the name of the field and the value is the rule object.
The __Rule__ object is an object that contains the rules for the field with a key which is the name of the rule and the value is the value of the rule.
It has the following properties:

- **required**:
```typescript
boolean | { value: boolean, error: string }
```
- **pattern**:
```typescript
RegExp | { value: RegExp, error: string }
```
- **minLength**:
```typescript
number | { value: number, error: string }
```
- **maxLength**:
```typescript
number | { value: number, error: string }
```
- **hasUpper**:
```typescript
boolean | { value: boolean, error: string }
```
- **hasLower**:
```typescript
boolean | { value: boolean, error: string }
```
- **hasNumber**:
```typescript
boolean | { value: boolean, error: string }
```
- hasSpecial:
```typescript
boolean | { value: boolean, error: string }
```
- equal:
```typescript
string | { value: string, error: string }
```

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
The above example shows the rules for a form with username, password and email fields.
The requred rule is if a field is required or not.
The pattern rule is a regular expression that the field must match.
The minLength and maxLength rules are the minimum and maximum length of the field.
The hasUpper, hasLower, hasNumber and hasSpecial rules are for password fields to check if the password contains at least one uppercase letter, lowercase letter, number and special character.
The equal rule is for password confirmation fields to check if the field is equal to the value of the field.

### Return Value
The `formValidator` function returns an object with the following properties:
- **valid**:
```typescript
boolean
```
- **errors**:
```typescript
{
    [key: string]: string[]
}
```

The `valid` property is a boolean that indicates if the form is valid or not.
The `errors` property is an object that contains the errors for the fields. The key is the name of the field and the value is an array of error messages.

## Field Validator
You can also just verify one individual field.
