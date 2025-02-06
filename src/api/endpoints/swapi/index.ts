import { SWAPI_BASE_URL } from './urls.ts';
import { EAttributes } from '../../../_constants/common.ts';

type TProps = {
  attr?: string;
};

export const getSwapiByAttribute = ({ attr = EAttributes.PEOPLE }: TProps) =>
  `${SWAPI_BASE_URL}/${attr}`;
