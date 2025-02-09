import './index.scss';
import { PageLayout } from '../../_layouts/page-layout';
import { Search } from './_components/search';
import { useCallback, useState } from 'react';
import { Root } from '../../api/requests/swapi/person/_types.ts';
import { Cards } from './_components/cards';
import { Pagination } from './_components/pagination';
import { getSwapiRequestResult } from '../../api/requests/swapi/person';
import { handleError } from './_components/search/_utils/handle-error.ts';
import { Loader } from '../../_components/loader';
import { useSearchParams } from 'react-router';
import { ErrorBoundary } from '../../_components/error-boundary';

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
  const [_searchParams, setSearchParams] = useSearchParams();

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
    <ErrorBoundary>
      <PageLayout>
        <Search
          isLoading={isLoading}
          error={error}
          errorMessage={errorMessage}
          loadSearchData={loadSearchData}
          setSearchParams={setSearchParams}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Cards searchData={searchData} setSearchParams={setSearchParams} />
            <Pagination
              searchData={searchData}
              loadSearchData={loadSearchData}
              setSearchParams={setSearchParams}
            />
          </>
        )}
      </PageLayout>
    </ErrorBoundary>
  );
};
