# form-validator

Simple form validator micro library written in typescript

## Installation
_Installing is not possible because it isn't published yet _

## Usage
```typescript
import { formValidator } from 'form-validator';

const {valid, errors} = formValidator(formObj, ruleObj);
```

The validate form takes two objects.
The first object is the form object which is the object that contains the form data.
It's type is { [key: string]: string }.

The second object is the rule object which is the object that contains the rules for the form data.
It's type is { [key: string]: RuleCondition }. The RuleCondition is an object that contains the rules for a specific field.
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
- **hasNumber:
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
