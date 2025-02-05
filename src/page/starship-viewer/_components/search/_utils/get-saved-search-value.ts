import { LSItem } from '../../../../../_constants/common.ts';

export const getSavedSearchValue = () => {
  return localStorage.getItem(LSItem) || '';
};
