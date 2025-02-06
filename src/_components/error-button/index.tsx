import { PureComponent } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';

type TState = {
  error: boolean;
};

const cn = classNames.bind(style);
const BLOCK_NAME = 'Error-button';

export class ErrorButton extends PureComponent<object, TState> {
  state = {
    error: false,
  };

  throwError = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('error inside error-button component');
    }

    return (
      <button className={cn(BLOCK_NAME)} onClick={this.throwError}>
        Throw error
      </button>
    );
  }
}
