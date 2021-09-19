import { DmInput, DmSubmitButton } from '@dm/react/shared/ui-form';
import { UserProfileDto } from '@dm/shared/demo/data-model';
import { useForm } from 'react-hook-form';
import styles from './user-profile-form.module.scss';

export interface UserProfileFormProps {
  user: UserProfileDto;
  submit: (user: UserProfileDto) => void;
}

export function UserProfileForm({ user, submit }: UserProfileFormProps) {
  const { handleSubmit, control } = useForm<UserProfileDto>({ mode: 'onChange', defaultValues: { name: '', ...user } });

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(submit)}>
        <DmInput name="email" label="Email" control={control} />
        <DmInput name="name" label="Name" control={control} />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Save"></DmSubmitButton>
        </div>
      </form>
    </div>
  );
}
