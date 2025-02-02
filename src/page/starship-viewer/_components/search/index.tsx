import { ChangeEvent, PureComponent, ReactNode } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { getSwapiRequestResult } from '../../../../api/requests/swapi';
import { Result } from '../../../../api/requests/swapi/_types.ts';
import { Loader } from '../../../../_components/loader';
import { ErrorButton } from '../../../../_components/error-button';
import { ErrorMessage } from '../../../../_components/error-message';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Search-panel';
const LSItem = 'searchValue';

type TState = {
  searchValue: string;
  errorMessage: string;
  isLoading: boolean;
  error: boolean;
};

type TProps = {
  setSearchData: (data: Array<Result>) => void;
};

export class Search extends PureComponent<TProps, TState> {
  state = {
    searchValue: '',
    errorMessage: '',
    isLoading: false,
    error: false,
  };

  async fetchData(searchValue: string) {
    this.setState({ isLoading: true });
    try {
      const searchData = await getSwapiRequestResult({ searchValue });
      return searchData;
    } catch {
      this.setErrorState('Something went wrong.');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  setErrorState(errorMessage: string) {
    this.setState({ error: true, errorMessage });
    setTimeout(() => this.setState({ error: false }), 3000);
  }

  getSavedSearchValue() {
    return localStorage.getItem(LSItem) || '';
  }

  saveSearchValue(searchValue: string) {
    localStorage.setItem(LSItem, searchValue);
  }

  async loadSearchData(searchValue: string) {
    const searchData = await this.fetchData(searchValue);
    if (searchData) {
      this.props.setSearchData(searchData);
    }
  }

  async componentDidMount() {
    const savedSearchValue = this.getSavedSearchValue();
    this.setState({ searchValue: savedSearchValue });
    await this.loadSearchData(savedSearchValue);
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchValue = value.toLowerCase().trim();
    this.setState({ searchValue });
  };

  onSearchButtonClick = async () => {
    const { searchValue } = this.state;
    this.saveSearchValue(searchValue);
    await this.loadSearchData(searchValue);
  };

  render(): ReactNode {
    return (
      <>
        {this.state.isLoading && <Loader />}
        {this.state.error && <ErrorMessage message={this.state.errorMessage} />}
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
