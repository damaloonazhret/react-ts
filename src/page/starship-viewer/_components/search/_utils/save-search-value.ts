import { LSItem } from '../../../../../_constants/common.ts';

type TProps = {
  searchValue: string;
};

export const saveSearchValue = ({ searchValue }: TProps) => {
  localStorage.setItem(LSItem, searchValue);
};
