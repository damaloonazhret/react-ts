import { describe, it } from 'vitest';
import { AdditionalCard } from '../index.tsx';
import { render } from '@testing-library/react';
import { TWorld } from '../../../../../../api/requests/swapi/homeworld/_types.ts';

export const mockWorld: TWorld = {
  name: 'Earth',
  rotation_period: '24',
  orbital_period: '365',
  diameter: '12742',
  climate: 'Temperate',
  gravity: '1',
  terrain: 'Forests, Mountains, Oceans',
  surface_water: '71',
  population: '7.8 billion',
  residents: ['Humans'],
  films: ['Film1', 'Film2'],
  created: '2025-01-01T00:00:00.000Z',
  edited: '2025-01-01T00:00:00.000Z',
  url: 'https://swapi.dev/api/planets/1/',
};

describe('Additional Card', () => {
  it('renders correctly', () => {
    render(<AdditionalCard additionalInfo={mockWorld} />);
  });
});
