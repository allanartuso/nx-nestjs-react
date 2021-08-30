import { render } from '@testing-library/react';

import SignInUp from './sign-in-up';

describe('SignInUp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignInUp />);
    expect(baseElement).toBeTruthy();
  });
});
