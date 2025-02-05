import './index.scss';
import { PageLayout } from '../../_layouts/page-layout';
import { Search } from './_components/search';
import { useState } from 'react';
import { Result } from '../../api/requests/swapi/_types.ts';
import { Cards } from './_components/cards';

export const Index = () => {
  const [searchData, setSearchData] = useState<Array<Result>>([]);

  return (
    <PageLayout>
      <Search setSearchData={setSearchData} />
      <Cards searchData={searchData} />
    </PageLayout>
  );
};
