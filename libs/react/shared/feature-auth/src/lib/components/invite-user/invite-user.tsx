import { DmInput, DmSubmitButton } from '@dm/react/shared/ui-form';
import { InviteUserDto } from '@dm/shared/auth-models';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { authActions } from '../../+state/auth.actions';
import { validators } from '../../auth-validators';
import styles from './invite-user.module.scss';

/* eslint-disable-next-line */
export interface InviteUserProps {}

export function InviteUser(props: InviteUserProps) {
  const { handleSubmit, control } = useForm<InviteUserDto>({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (inviteUser: InviteUserDto) => {
    dispatch(authActions.inviteUser(inviteUser.email));
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DmInput name="email" label="Email" control={control} rules={validators.username} />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Submit"></DmSubmitButton>
        </div>
      </form>
    </div>
  );
}

export default InviteUser;
