import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Index } from '../page/starship-viewer';
import { BrowserRouter } from 'react-router';

describe('index', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
  });
});
