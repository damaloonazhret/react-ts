import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Result } from '../../../../../api/requests/swapi/_types.ts';
import { PureComponent } from 'react';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Card';

type TProps = {
  searchData: Result;
};

export class Card extends PureComponent<TProps> {
  render() {
    const { name, created, birth_year, eye_color } = this.props.searchData;

    return (
      <div className={cn(BLOCK_NAME)}>
        <div>{name}</div>
        <div>{created}</div>
        <div>{birth_year}</div>
        <div>{eye_color}</div>
      </div>
    );
  }
}
