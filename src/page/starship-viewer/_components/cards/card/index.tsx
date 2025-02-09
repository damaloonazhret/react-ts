import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Result } from '../../../../../api/requests/swapi/person/_types.ts';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Card';

type TProps = {
  searchData: Result;
  requestHomeWorld: ({ id }: { id: string }) => void;
};

export const Card = ({ searchData, requestHomeWorld }: TProps) => {
  const handleClick = () => {
    const planetId = searchData.homeworld.split('/').filter(Boolean).pop();
    if (planetId) {
      requestHomeWorld({ id: planetId });
    }
  };

  return (
    <div onClick={handleClick} className={cn(BLOCK_NAME)}>
      <div>{searchData.name}</div>
      <div>{searchData.created}</div>
      <div>{searchData.birth_year}</div>
      <div>{searchData.eye_color}</div>
    </div>
  );
};
