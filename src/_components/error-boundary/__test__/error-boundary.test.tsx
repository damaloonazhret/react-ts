import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../index.tsx';

const ThrowError = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  it('Should return an error boundary', () => {
    render(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>
    );
  });

  it('should render fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong! 😵')).toBeDefined();
    expect(screen.getByText('Test Error')).toBeDefined();
  });
});
