import { describe, it } from 'vitest';
import { Loader } from '../index.tsx';
import { render } from '@testing-library/react';

describe('loader', () => {
  it('renders correctly', () => {
    render(<Loader />);
  });
});
