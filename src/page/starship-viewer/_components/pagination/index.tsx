import { Root } from '../../../../api/requests/swapi/person/_types.ts';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { NavLink, SetURLSearchParams } from 'react-router';
import { ITEMS_PER_PAGE, LSItem } from '../../../../_constants/common.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

type TProps = {
  searchData: Root;
  setSearchParams: SetURLSearchParams;
  loadSearchData: ({
    searchValue,
    page,
  }: {
    searchValue: string;
    page: string;
  }) => Promise<void>;
};

const cn = classNames.bind(style);
const BLOCK_NAME = 'Pagination';

export const Pagination = ({
  searchData,
  loadSearchData,
  setSearchParams,
}: TProps) => {
  const pages = Math.ceil(searchData.count / ITEMS_PER_PAGE);
  const { getItem } = useLocalStorage();

  return (
    <div className={cn(BLOCK_NAME)}>
      {Array.from(Array(pages).keys()).map((_, i) => {
        const page = i + 1;
        const savedSearchValue = getItem<string>(LSItem);

        const handleClick = () => {
          loadSearchData({ searchValue: savedSearchValue, page: String(page) });
          if (savedSearchValue) {
            setSearchParams({ search: savedSearchValue });
          }
        };

        return (
          <NavLink
            to={`/page/${page}`}
            className={({ isActive }) =>
              [
                isActive ? cn(`${BLOCK_NAME}__active`) : '',
                cn(`${BLOCK_NAME}__btn`),
              ].join(' ')
            }
            key={i}
            type="button"
            onClick={handleClick}
          >
            {page}
          </NavLink>
        );
      })}
    </div>
  );
};
