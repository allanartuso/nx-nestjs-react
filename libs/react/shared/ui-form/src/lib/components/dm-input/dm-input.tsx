import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { ControlRules } from '../../models/form.model';
import { getErrorMessage } from '../../validators/error-messages';
import styles from './dm-input.module.scss';

export interface DmInputProps {
  label: string;
  name: string;
  control: Control<any>;
  rules?: ControlRules;
  type?: string;
  readonly?: boolean;
  disabled?: boolean;
}

export const DmInput: React.FC<DmInputProps> = ({ name, control, rules, label, type, readonly = false, disabled = false }) => {
  const {
    field: { ref, ...inputProps },
    fieldState,
    formState,
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={styles.field}>
      <TextField
        label={label}
        type={type ? type : 'text'}
        {...inputProps}
        inputRef={ref}
        error={fieldState.invalid}
        helperText={getErrorMessage(fieldState.error?.message, { label })}
        required={!!rules?.required}
        InputProps={{
          readOnly: readonly,
        }}
        disabled={disabled}
      />
    </div>
  );
};
