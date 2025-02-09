import './index.scss';
import { PageLayout } from '../../_layouts/page-layout';
import { Search } from './_components/search';
import { useCallback, useState } from 'react';
import { Root } from '../../api/requests/swapi/_types.ts';
import { Cards } from './_components/cards';
import { Pagination } from './_components/pagination';
import { getSwapiRequestResult } from '../../api/requests/swapi';
import { handleError } from './_components/search/_utils/handle-error.ts';

export const Index = () => {
  const [searchData, setSearchData] = useState<Root>({
    results: [],
    count: 0,
    next: '',
    previous: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadSearchData = useCallback(
    async ({ searchValue, page }: { searchValue: string; page: string }) => {
      setIsLoading(true);
      try {
        const searchData = await getSwapiRequestResult({
          searchValue,
          page,
        });
        if (searchData.results) {
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

  return (
    <PageLayout>
      <Search
        isLoading={isLoading}
        error={error}
        errorMessage={errorMessage}
        loadSearchData={loadSearchData}
      />
      <Cards searchData={searchData} />
      <Pagination
        isLoading={isLoading}
        searchData={searchData}
        loadSearchData={loadSearchData}
      />
    </PageLayout>
  );
};
