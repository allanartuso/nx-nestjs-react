import { errorCode, strongPasswordValidator } from '@dm/react/shared/ui-form';

export const validators = {
  username: {
    required: errorCode.required,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: errorCode.email,
    },
  },
  password: {
    required: errorCode.required,
    ...strongPasswordValidator(),
  },
  newPassword: {
    required: errorCode.required,
    ...strongPasswordValidator(),
  },
  code: {
    required: 'Code is required',
  },
};
