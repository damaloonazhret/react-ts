import { Root } from '../../../../api/requests/swapi/_types.ts';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { NavLink } from 'react-router';
import { ITEMS_PER_PAGE, LSItem } from '../../../../_constants/common.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { Loader } from '../../../../_components/loader';

type TProps = {
  searchData: Root;
  isLoading: boolean;
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
  isLoading,
}: TProps) => {
  const pages = Math.ceil(searchData.count / ITEMS_PER_PAGE);
  const { getItem } = useLocalStorage();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={cn(BLOCK_NAME)}>
      {Array.from(Array(pages).keys()).map((_, i) => {
        const page = i + 1;
        const savedSearchValue = getItem<string>(LSItem);

        const handleClick = () => {
          loadSearchData({ searchValue: savedSearchValue, page: String(page) });
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
