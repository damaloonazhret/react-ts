import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Loader } from '../../../../_components/loader';
import { ErrorButton } from '../../../../_components/error-button';
import { ErrorMessage } from '../../../../_components/error-message';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { LSItem } from '../../../../_constants/common.ts';
import { useNavigate, useParams } from 'react-router';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Search-panel';

type TProps = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
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
  isLoading,
  loadSearchData,
}: TProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { getItem, setItem } = useLocalStorage();

  const { page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchValue = getItem<string>(LSItem);
    setSearchValue(savedSearchValue);
    loadSearchData({ searchValue: savedSearchValue, page: page || '1' });
  }, [getItem, loadSearchData, page]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase().trim();
    setSearchValue(searchValue);
  };

  const onSearchButtonClick = async () => {
    setItem<string>({ key: LSItem, value: searchValue });
    navigate(`/page/1`);
    await loadSearchData({ searchValue, page: '1' });
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={errorMessage} />}
      <div className={cn(BLOCK_NAME)}>
        <input
          className={cn(`${BLOCK_NAME}__input`)}
          type="text"
          onChange={onInputChange}
          value={searchValue}
        />
        <ErrorButton />
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
