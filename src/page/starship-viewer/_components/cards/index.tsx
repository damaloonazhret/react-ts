import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Result } from '../../../../api/requests/swapi/_types.ts';
import { Card } from './card';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Cards';

type TProps = {
  searchData: Array<Result>;
};

export function Cards({ searchData }: TProps) {
  if (searchData.length === 0) {
    return <div>Nothing was found</div>;
  }

  return (
    <div className={cn(BLOCK_NAME)}>
      {searchData.map((data) => (
        <Card key={data.name} searchData={data} />
      ))}
    </div>
  );
}
