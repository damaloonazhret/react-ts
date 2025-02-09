import { describe, it, vi, expect, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Card } from '../index.tsx';
import { Result } from '../../../../../../api/requests/swapi/person/_types.ts';

describe('Card Component', () => {
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

  afterEach(cleanup);
  const fetchData = vi.fn(() => Promise.resolve(mockData));

  const requestHomeWorldMock = vi.fn();
  beforeEach(() => {
    render(
      <Card searchData={mockData} requestHomeWorld={requestHomeWorldMock} />
    );
    fetchData.mockClear();
  });

  it('renders character data correctly', () => {
    expect(screen.getByText('Luke Skywalker')).toBeDefined();
    expect(screen.getByText('2024-02-08T12:00:00.000Z')).toBeDefined();
    expect(screen.getByText('19BBY')).toBeDefined();
    expect(screen.getByText('Blue')).toBeDefined();
  });

  it('calls requestHomeWorld with correct planet ID on click', () => {
    fireEvent.click(screen.getByText('Luke Skywalker'));

    expect(requestHomeWorldMock).toHaveBeenCalledTimes(1);
    expect(requestHomeWorldMock).toHaveBeenCalledWith({ id: '1' });
  });
});
