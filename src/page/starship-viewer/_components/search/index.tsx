import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { getSwapiRequestResult } from '../../../../api/requests/swapi';
import { Result } from '../../../../api/requests/swapi/_types.ts';
import { Loader } from '../../../../_components/loader';
import { ErrorButton } from '../../../../_components/error-button';
import { ErrorMessage } from '../../../../_components/error-message';
import { handleError } from './_utils/handle-error.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { LSItem } from '../../../../_constants/common.ts';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Search-panel';

type TProps = {
  setSearchData: (data: Array<Result>) => void;
};

export const Search = ({ setSearchData }: TProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const { getItem, setItem } = useLocalStorage();

  const loadSearchData = useCallback(
    async (searchValue: string) => {
      setIsLoading(true);
      try {
        const searchData = await getSwapiRequestResult({ searchValue });
        if (searchData) {
          setSearchData(searchData);
        }
      } catch {
        handleError({ setErrorMessage, setError });
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchData]
  );

  useEffect(() => {
    const savedSearchValue = getItem<string>(LSItem);
    console.log(savedSearchValue);
    setSearchValue(savedSearchValue);
    loadSearchData(savedSearchValue);
  }, [getItem, loadSearchData]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase().trim();
    setSearchValue(searchValue);
  };

  const onSearchButtonClick = async () => {
    setItem<string>({ key: LSItem, value: searchValue });
    await loadSearchData(searchValue);
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
