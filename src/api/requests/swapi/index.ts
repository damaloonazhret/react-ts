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

  try {
    await fetch(`${url}/?search=${searchValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error data');
        }
        return response.json();
      })
      .then((data: Root) => {
        data.results.forEach((result: Result) => {
          results.push(result);
        });
      });
  } catch (error) {
    console.log(error);
  }

  return results;
};
