import { render } from '@testing-library/react';
import { DmSubmitButton } from './dm-submit-button';

describe('SubmitButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DmSubmitButton />);
    expect(baseElement).toBeTruthy();
  });
});
