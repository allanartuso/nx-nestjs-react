import { DmInput, DmSubmitButton } from '@dm/react/shared/ui-form';
import { UserProfileDto } from '@dm/shared/demo/data-model';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { formActions } from '../../+state/user.actions';
import styles from './user-profile-form.module.scss';

/* eslint-disable-next-line */
export interface UserProfileFormProps {
  user: UserProfileDto;
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<UserProfileDto>({ mode: 'onChange', defaultValues: user });

  const onSubmit = (user: UserProfileDto) => {
    dispatch(formActions.save(user));
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DmInput name="email" label="Email" control={control} />
        <DmInput name="name" label="Name" control={control} />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Save"></DmSubmitButton>
        </div>
      </form>
    </div>
  );
}
