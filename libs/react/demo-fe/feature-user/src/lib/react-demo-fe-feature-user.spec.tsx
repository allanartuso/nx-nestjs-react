import { render } from '@testing-library/react';
import ReactDemoBeFeatureUser from './react-demo-fe-feature-user';

describe('ReactDemoBeFeatureUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoBeFeatureUser />);
    expect(baseElement).toBeTruthy();
  });
});
