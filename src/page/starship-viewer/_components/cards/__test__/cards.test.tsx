import { describe, vi, it } from 'vitest';
import { render } from '@testing-library/react';
import { Cards } from '../index.tsx';
import {
  Result,
  Root,
} from '../../../../../api/requests/swapi/person/_types.ts';
import { BrowserRouter } from 'react-router';

const mockData: Result = {
  name: 'Luke Skywalker',
  created: '2024-02-08T12:00:00.000Z',
  birth_year: '19BBY',
  eye_color: 'Blue',
  homeworld: 'https://swapi.dev/api/planets/1/',
  url: '/2',
  height: '',
  edited: '',
  films: [''],
  gender: '',
  mass: '',
  hair_color: '',
  skin_color: '',
  species: [''],
  starships: [''],
  vehicles: [''],
};

const mockSearchData: Root = {
  count: 1,
  next: '',
  previous: '',
  results: [mockData],
};

const mockUseSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams,
  };
});

describe('Cards component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Cards
          searchData={mockSearchData}
          setSearchParams={mockUseSearchParams}
        />
      </BrowserRouter>
    );
  });
});
