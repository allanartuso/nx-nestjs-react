import { DmInput, DmSubmitButton } from '@dm/react/shared/ui-form';
import { ResetPasswordDto } from '@dm/shared/auth-models';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authActions } from '../../+state/auth.actions';
import { validators } from '../../auth-validators';
import styles from './reset-password.module.scss';

/* eslint-disable-next-line */
export interface ResetPasswordProps {}

export function ResetPassword(props: ResetPasswordProps) {
  const { handleSubmit, control } = useForm<ResetPasswordDto>({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (resetPassword: ResetPasswordDto) => {
    dispatch(authActions.resetPassword(resetPassword));
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DmInput name="username" label="Email" control={control} rules={validators.username} />
        <DmInput name="code" label="Code" control={control} rules={validators.code} />
        <DmInput name="newPassword" label="New password" type="password" control={control} rules={validators.password} />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Submit"></DmSubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
