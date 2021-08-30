import { render } from '@testing-library/react';

import InviteUser from './invite-user';

describe('InviteUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InviteUser />);
    expect(baseElement).toBeTruthy();
  });
});
