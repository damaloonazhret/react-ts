import { getSwapiByAttribute } from '../../endpoints/swapi';
import { Root } from './_types.ts';

type TProps = {
  searchAttr?: string;
  searchValue?: string;
  page?: string;
};

export const getSwapiRequestResult = async ({
  searchAttr,
  searchValue = '',
  page = '1',
}: TProps) => {
  const url = getSwapiByAttribute({ attr: searchAttr });
  const requestUrl = searchValue
    ? `${url}/?search=${searchValue}&page=${page}`
    : `${url}?page=${page}`;

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data: Root = await response.json();
    return data;
  } catch {
    throw new Error('Error getSwapiRequestResult');
  }
};
