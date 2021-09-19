import Switch from '@mui/material/Switch';
import { Control, FieldValues, useController } from 'react-hook-form';
import { ControlRules } from '../../models/form.model';
import './dm-switch-button.module.scss';

export interface DmSwitchButtonProps {
  label: string;
  name: string;
  control: Control<FieldValues>;
  rules?: ControlRules;
  type?: string;
}

export const DmSwitchButton: React.FC<DmSwitchButtonProps> = ({ name, control, rules, label, type }) => {
  const {
    field: { ref, ...inputProps },
    fieldState,
    formState,
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  return (
    <div>
      <Switch {...inputProps} inputRef={ref} /> {label}
    </div>
  );
};
