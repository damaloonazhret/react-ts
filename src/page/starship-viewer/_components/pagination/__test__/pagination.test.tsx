import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Pagination } from '../index.tsx';
import { BrowserRouter } from 'react-router';

const mockUseSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams,
  };
});

describe('Pagination', () => {
  const loadSearchData = vi.fn();
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Pagination
          setSearchParams={mockUseSearchParams}
          count={5}
          loadSearchData={loadSearchData}
        />
      </BrowserRouter>
    );
  });
});
