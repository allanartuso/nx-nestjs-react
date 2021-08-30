import { render } from '@testing-library/react';
import { DmSwitchButton } from './dm-switch-button';

describe('Switch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DmSwitchButton />);
    expect(baseElement).toBeTruthy();
  });
});
