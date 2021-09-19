import { DmInput, DmRadio, DmSubmitButton } from '@dm/react/shared/ui-form';
import { UserCredentialsDto } from '@dm/shared/auth-models';
import { Link, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authActions } from '../../+state/auth.actions';
import { validators } from '../../auth-validators';
import styles from './sign-in-up.module.scss';

enum UserCredentialActionType {
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
}

type UserCredentialVm = UserCredentialsDto & { actionType: UserCredentialActionType };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignInUpProps {
  // serverFieldErrors: FormFieldErrors[];
  // requestState: RequestState
}

const radioValues = [
  { value: UserCredentialActionType.SIGN_IN, text: 'Sign in' },
  { value: UserCredentialActionType.SIGN_UP, text: 'Sign up' },
];

export const SignInUp: React.FC<SignInUpProps> = (props) => {
  const { handleSubmit, control, getValues, setValue, formState } = useForm<UserCredentialVm>({
    mode: 'onTouched',
    defaultValues: {
      actionType: UserCredentialActionType.SIGN_IN,
      username: '',
      password: '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (userCredentials: UserCredentialVm) => {
    if (userCredentials.actionType === UserCredentialActionType.SIGN_IN) {
      dispatch(
        authActions.signIn({
          username: userCredentials.username,
          password: userCredentials.password,
        })
      );
    }

    if (userCredentials.actionType === UserCredentialActionType.SIGN_UP) {
      dispatch(
        authActions.signUp({
          username: userCredentials.username,
          password: userCredentials.password,
        })
      );
    }
  };

  const onForgotPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formValue = getValues();

    if (formValue.username && !formState.errors.username) {
      dispatch(authActions.forgotPassword(formValue.username));
    } else {
      setValue('username', formValue.username, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DmRadio name="actionType" label="Sign up" items={radioValues} control={control}></DmRadio>
        <DmInput name="username" label="Email" control={control} rules={validators.username} />
        <DmInput name="password" label="Password" type="password" control={control} />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Submit"></DmSubmitButton>

          <Typography>
            <Link href="#" onClick={onForgotPassword}>
              Change Password
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};
