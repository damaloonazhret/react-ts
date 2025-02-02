import { ChangeEvent, PureComponent, ReactNode } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { getSwapiRequestResult } from '../../../../api/requests/swapi';
import { Result } from '../../../../api/requests/swapi/_types.ts';
import { Loader } from '../../../../_components/loader';
import { ErrorButton } from '../../../../_components/error-button';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Search-panel';

type TState = {
  searchValue: string;
  isLoading: boolean;
};

type TProps = {
  setSearchData: (data: Array<Result>) => void;
};

const LSItem = 'searchValue';

export class Search extends PureComponent<TProps, TState> {
  state = {
    searchValue: '',
    isLoading: false,
  };

  async componentDidMount() {
    const savedSearchValue = localStorage.getItem(LSItem) || '';
    this.setState({ searchValue: savedSearchValue, isLoading: true });
    const searchData = await getSwapiRequestResult({
      searchValue: savedSearchValue,
    });
    this.setState({ isLoading: false });
    this.props.setSearchData(searchData);
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase().trim();
    this.setState({ searchValue });
  };

  getData = async (searchValue: string) => {
    localStorage.setItem(LSItem, searchValue);
    this.setState({ isLoading: true });
    const searchData = await getSwapiRequestResult({ searchValue });
    this.setState({ isLoading: false });
    return searchData;
  };

  onSearchButtonClick = async () => {
    const { searchValue } = this.state;
    const searchData = await this.getData(searchValue);

    this.props.setSearchData(searchData);
  };

  render(): ReactNode {
    return (
      <>
        {this.state.isLoading && <Loader />}
        <div className={cn(BLOCK_NAME)}>
          <input
            className={cn(`${BLOCK_NAME}__input`)}
            type="text"
            onChange={this.onInputChange}
            value={this.state.searchValue}
          />
          <ErrorButton />
          <button
            className={cn(`${BLOCK_NAME}__btn`)}
            type="button"
            onClick={this.onSearchButtonClick}
          >
            Search
          </button>
        </div>
      </>
    );
  }
}
