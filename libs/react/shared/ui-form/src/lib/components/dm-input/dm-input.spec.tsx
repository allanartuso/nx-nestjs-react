import { render } from '@testing-library/react';
import { DmInput } from './dm-input';

describe('DmInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DmInput />);
    expect(baseElement).toBeTruthy();
  });
});
