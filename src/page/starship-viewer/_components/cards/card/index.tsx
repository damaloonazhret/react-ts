import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Result } from '../../../../../api/requests/swapi/_types.ts';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Card';

type TProps = {
  searchData: Result;
};

export const Card = ({ searchData }: TProps) => {
  return (
    <div className={cn(BLOCK_NAME)}>
      <div>{searchData.name}</div>
      <div>{searchData.created}</div>
      <div>{searchData.birth_year}</div>
      <div>{searchData.eye_color}</div>
    </div>
  );
};
