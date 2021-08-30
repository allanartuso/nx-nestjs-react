import { Button } from '@material-ui/core';
import { RequestState } from '../../models/form.model';
import './dm-submit-button.module.scss';

/* eslint-disable-next-line */
export interface DmSubmitButtonProps {
  text: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset' | undefined;
  requestState?: RequestState;
}

export const DmSubmitButton: React.FC<DmSubmitButtonProps> = ({ text, disabled, type = 'submit' }) => {
  return (
    <Button variant="contained" color="primary" type={type} disabled={disabled}>
      {text}
    </Button>
  );
};
