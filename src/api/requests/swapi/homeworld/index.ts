import { TWorld } from './_types.ts';

type TProps = {
  id: string;
};

export const getHomeWorldRequest = async ({ id }: TProps) => {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/${id}/`);

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data: TWorld = await response.json();
    return data;
  } catch {
    throw new Error('Error getHomeWorldRequest');
  }
};
