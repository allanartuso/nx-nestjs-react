import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Control, useController } from 'react-hook-form';
import './dm-radio.module.scss';

export interface DmRadioProps {
  label?: string;
  labelPlacement?: 'end' | 'top' | 'start' | 'bottom' | undefined;
  items: DmRadioItem[];
  name: string;
  control: Control<any>;
}

export interface DmRadioItem {
  text: string;
  value: string;
}

export const DmRadio: React.FC<DmRadioProps> = ({ items, label, control, name, labelPlacement = 'end' }) => {
  const {
    field: { ref, value, ...inputProps },
    fieldState,
    formState,
  } = useController({
    name,
    control,
  });

  return (
    <RadioGroup row aria-label="position" defaultValue="top">
      {items.map((item) => (
        <FormControlLabel
          key={item.value}
          control={<Radio color="primary" />}
          label={item.text}
          labelPlacement={labelPlacement}
          value={item.value}
          checked={item.value === value}
          {...inputProps}
          inputRef={ref}
        />
      ))}
    </RadioGroup>
  );
};
