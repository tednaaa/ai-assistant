import { render } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button onClick={() => {}}>Test</Button>);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toContain('Test');
  });
});
