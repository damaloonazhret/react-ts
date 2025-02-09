import { describe, it } from 'vitest';
import { ErrorMessage } from '../index.tsx';
import { render } from '@testing-library/react';

describe('error-message', () => {
  it('renders correctly', () => {
    render(<ErrorMessage message="error" />);
  });
});
