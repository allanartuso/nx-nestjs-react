import { render } from '@testing-library/react';

import ReactSharedUiForm from './react-shared-ui-form';

describe('ReactSharedUiForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactSharedUiForm />);
    expect(baseElement).toBeTruthy();
  });
});
