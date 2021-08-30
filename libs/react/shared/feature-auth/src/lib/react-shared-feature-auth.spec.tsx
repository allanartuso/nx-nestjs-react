import { render } from '@testing-library/react';

import ReactSharedFeatureAuth from './react-shared-feature-auth';

describe('ReactSharedFeatureAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactSharedFeatureAuth />);
    expect(baseElement).toBeTruthy();
  });
});
