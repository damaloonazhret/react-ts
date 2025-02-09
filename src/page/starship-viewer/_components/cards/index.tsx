import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Root } from '../../../../api/requests/swapi/person/_types.ts';
import { Card } from './card';
import { getHomeWorldRequest } from '../../../../api/requests/swapi/homeworld';
import { useCallback, useEffect, useState } from 'react';
import { TWorld } from '../../../../api/requests/swapi/homeworld/_types.ts';
import { Loader } from '../../../../_components/loader';
import { AdditionalCard } from './additionalCard';
import { SetURLSearchParams, useNavigate, useParams } from 'react-router';
import { LSItem } from '../../../../_constants/common.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Cards';

type TProps = {
  searchData: Root;
  setSearchParams: SetURLSearchParams;
};

export function Cards({ searchData, setSearchParams }: TProps) {
  const [additionalInfo, setAdditionalInfo] = useState<TWorld | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { page, homeworldID } = useParams();
  const { getItem } = useLocalStorage();

  const requestHomeWorld = useCallback(
    async ({ id }: { id: string }) => {
      navigate(`/page/${page}/homeworld/${id}`);
      const savedSearchValue = getItem<string>(LSItem);
      if (savedSearchValue) {
        setSearchParams({ search: savedSearchValue });
      }
      setIsLoading(true);
      const homeWorld = await getHomeWorldRequest({ id });
      setAdditionalInfo(homeWorld);
      setIsLoading(false);
    },
    [getItem, navigate, page, setSearchParams]
  );

  useEffect(() => {
    if (homeworldID) {
      requestHomeWorld({ id: homeworldID });
    }
  }, [homeworldID, requestHomeWorld]);

  if (searchData.results.length === 0) {
    return <div>Nothing was found</div>;
  }

  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__common`)}>
        {searchData.results.map((data) => (
          <Card
            key={data.name}
            searchData={data}
            requestHomeWorld={requestHomeWorld}
          />
        ))}
      </div>
      {additionalInfo && (
        <div className={cn(`${BLOCK_NAME}__additional`)}>
          {isLoading ? (
            <Loader />
          ) : (
            <AdditionalCard additionalInfo={additionalInfo} />
          )}
        </div>
      )}
    </div>
  );
}
