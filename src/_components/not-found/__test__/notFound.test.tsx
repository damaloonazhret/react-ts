import { describe, it } from 'vitest';
import { NotFound } from '../index.tsx';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

describe('Not-found', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  });
});
