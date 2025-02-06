import { PureComponent } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Error-message';

type TProps = {
  message: string;
};

export class ErrorMessage extends PureComponent<TProps> {
  render() {
    const errorMessage = this.props.message;
    return (
      <div className={cn(BLOCK_NAME)}>
        <h2>Ooops! Catch error</h2>
        {errorMessage && <span>message: {errorMessage}</span>}
      </div>
    );
  }
}
