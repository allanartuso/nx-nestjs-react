import { DmInput, DmSubmitButton } from '@dm/react/shared/ui-form';
import { ProjectDto } from '@dm/shared/demo/data-model';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './project-form.module.scss';

export interface ProjectFormProps {
  submit: (resource: ProjectDto) => void;
  resource?: ProjectDto;
}

export function ProjectForm({ resource, submit }: ProjectFormProps) {
  const { handleSubmit, control } = useForm<ProjectDto>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      github: '',
      private: false,
      ...resource,
    },
  });

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(submit)}>
        <DmInput name="name" label="Name" control={control} />
        <DmInput name="github" label="Github" control={control} />
        <DmInput name="private" label="Private" control={control} type="checkbox" />

        <div className={styles['form-actions']}>
          <DmSubmitButton text="Save"></DmSubmitButton>
        </div>
      </form>
    </div>
  );
}
