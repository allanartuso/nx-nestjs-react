import { render } from '@testing-library/react';
import { DmRadio } from './dm-radio';

describe('DmRadio', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DmRadio />);
    expect(baseElement).toBeTruthy();
  });
});
