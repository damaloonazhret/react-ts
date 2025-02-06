import './index.scss';
import { PageLayout } from '../../_layouts/page-layout';
import { Search } from './_components/search';
import { PureComponent } from 'react';
import { Result } from '../../api/requests/swapi/_types.ts';
import { Cards } from './_components/cards';

type TState = {
  searchData: Array<Result>;
};

export class Index extends PureComponent {
  state: TState = {
    searchData: [],
  };

  setSearchData = (data: Array<Result>) => {
    this.setState({ searchData: data });
  };

  render() {
    return (
      <PageLayout>
        <Search setSearchData={this.setSearchData} />
        <Cards searchData={this.state.searchData} />
      </PageLayout>
    );
  }
}
