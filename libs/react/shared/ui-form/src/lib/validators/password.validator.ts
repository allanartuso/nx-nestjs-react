import { RegisterOptions } from 'react-hook-form';
import { errorCode } from './error-messages';

export function oneLowerCaseValidator(): RegisterOptions {
  return {
    pattern: {
      value: /(?=.*[a-z])/,
      message: errorCode.oneLowerCase,
    },
  };
}

export function oneUpperCaseValidator(): RegisterOptions {
  return {
    pattern: {
      value: /(?=.*[A-Z])/,
      message: errorCode.oneUpperCase,
    },
  };
}

export function oneNumberValidator(): RegisterOptions {
  return {
    pattern: {
      value: /(?=.*[0-9])/,
      message: errorCode.oneNumber,
    },
  };
}

export function oneSpecialCharacterValidator(): RegisterOptions {
  return {
    pattern: {
      value: /(?=.*[!@#$%^&*])/,
      message: errorCode.oneSpecialCharacter,
    },
  };
}

export function strongPasswordValidator(): RegisterOptions {
  return {
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      message: errorCode.strongPassword,
    },
  };
}

// export function passwordsMatchValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
//   return (form: FormGroup): { [key: string]: any } | null => {
//     const passwordValue = form.get(passwordControlName).value;
//     const confirmPasswordValue = form.get(confirmPasswordControlName).value;

//     return passwordValue === confirmPasswordValue ? null : { passwordsMatch: true };
//   };
// }
