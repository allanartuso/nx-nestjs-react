import { render } from '@testing-library/react';

import ReactDemoFeFeatureProjects from './react-demo-fe-feature-projects';

describe('ReactDemoFeFeatureProjects', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDemoFeFeatureProjects />);
    expect(baseElement).toBeTruthy();
  });
});
