import { render } from '@testing-library/react';
import CreateProject from './create-project';

describe('Project', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateProject />);
    expect(baseElement).toBeTruthy();
  });
});
