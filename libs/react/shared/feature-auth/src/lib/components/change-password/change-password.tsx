import { DmInput, DmSubmitButton } from '@dm/react/shared/ui-form';
import { UserChangePasswordDto } from '@dm/shared/auth-models';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authActions } from '../../+state/auth.actions';
import { validators } from '../../auth-validators';
import styles from './change-password.module.scss';

/* eslint-disable-next-line */
export interface ChangePasswordProps {}

export function ChangePassword(props: ChangePasswordProps) {
  const { handleSubmit, control } = useForm<UserChangePasswordDto>({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (userCredentials: UserChangePasswordDto) => {
    dispatch(authActions.signIn(userCredentials));
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DmInput name="username" label="Username" control={control} rules={validators.username} />
        <DmInput name="password" label="Password" type="password" control={control} rules={validators.password} />
        <DmInput name="newPassword" label="newPassword" type="password" control={control} rules={validators.newPassword} />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Submit"></DmSubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
