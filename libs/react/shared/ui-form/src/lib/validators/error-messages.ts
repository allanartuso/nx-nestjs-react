const errorMessages = {
  required: '{{label}} is required.',
  max: 'Maximum {{label}} is {{max}}.',
  min: 'Minimum {{label}} is {{min}}.',
  maxlength: '{{label}} can be max {{requiredLength}} characters long.',
  minlength: '{{label}} must be at least {{requiredLength}} characters long.',
  email: '{{label}} must be an email.',
  oneNumber: '{{label}} must have at least one number.',
  oneLowerCase: '{{label}} must have at least one lowercase letter.',
  oneUpperCase: '{{label}} must have at least one uppercase letter.',
  oneSpecialCharacter: '{{label}} must have at least one special character (!@#$%^&*).',
  strongPassword:
    '{{label}} must have at least 8 characters, one number, one lowercase letter, one uppercase letter and special character (!@#$%^&*).',
};

export type ErrorCode = keyof typeof errorMessages;

export const errorCode: Record<ErrorCode, ErrorCode> = Object.keys(errorMessages).reduce(
  (result, key) => ({ ...result, [key]: key }),
  {} as Record<ErrorCode, ErrorCode>
);

export function getErrorMessage(errorKey: string | undefined, replacements: Record<string, string> = {}) {
  if (!errorKey) return;

  if (!errorMessages[errorKey as ErrorCode]) {
    return `Missing error message to the error with key ${errorKey}`;
  }

  return errorMessages[errorKey as ErrorCode].replace(/{{(\w+)}}/g, (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
    replacements[placeholderWithoutDelimiters] ? replacements[placeholderWithoutDelimiters] : placeholderWithDelimiters
  );
}
