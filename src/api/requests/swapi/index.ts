import { getSwapiByAttribute } from '../../endpoints/swapi';
import { Result, Root } from './_types.ts';

type TProps = {
  searchAttr?: string;
  searchValue?: string;
};

export const getSwapiRequestResult = async ({
  searchAttr,
  searchValue = '',
}: TProps) => {
  const url = getSwapiByAttribute({ attr: searchAttr });
  const results: Array<Result> = [];
  const requestUrl = searchValue ? `${url}/?search=${searchValue}` : `${url}`;

  try {
    await fetch(requestUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetch data');
        }
        return response.json();
      })
      .then((data: Root) => {
        data.results.forEach((result: Result) => {
          results.push(result);
        });
      });
  } catch {
    throw new Error('Error getSwapiRequestResult');
  }

  return results;
};
