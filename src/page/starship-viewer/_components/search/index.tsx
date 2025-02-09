import { ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { ErrorMessage } from '../../../../_components/error-message';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { LSItem } from '../../../../_constants/common.ts';
import { SetURLSearchParams, useNavigate, useParams } from 'react-router';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Search-panel';

type TProps = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  setSearchParams: SetURLSearchParams;
  loadSearchData: ({
    searchValue,
    page,
  }: {
    searchValue: string;
    page: string;
  }) => Promise<void>;
};

export const Search = ({
  errorMessage,
  error,
  loadSearchData,
  setSearchParams,
}: TProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { getItem, setItem } = useLocalStorage();
  const { page } = useParams();
  const refPage = useRef<string | undefined>(page);

  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchValue = getItem<string>(LSItem);
    setSearchValue(savedSearchValue);
    loadSearchData({
      searchValue: savedSearchValue,
      page: refPage.current || '1',
    });
  }, [getItem, loadSearchData]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase().trim();
    setSearchValue(searchValue);
  };

  const onSearchButtonClick = async () => {
    setItem<string>({ key: LSItem, value: searchValue });
    navigate(`/page/1`);
    if (searchValue) {
      setSearchParams({ search: searchValue });
    }
    await loadSearchData({ searchValue, page: '1' });
  };

  return (
    <>
      {error && <ErrorMessage message={errorMessage} />}
      <div className={cn(BLOCK_NAME)}>
        <input
          className={cn(`${BLOCK_NAME}__input`)}
          type="text"
          onChange={onInputChange}
          value={searchValue}
        />
        <button
          className={cn(`${BLOCK_NAME}__btn`)}
          type="button"
          onClick={onSearchButtonClick}
        >
          Search
        </button>
      </div>
    </>
  );
};
