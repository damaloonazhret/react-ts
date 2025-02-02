import classNames from 'classnames/bind';
import style from './index.module.scss';
import { Result } from '../../../../api/requests/swapi/_types.ts';
import { Card } from './card';
import { PureComponent } from 'react';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Cards';

type TProps = {
  searchData: Array<Result>;
};

export class Cards extends PureComponent<TProps> {
  render() {
    if (this.props.searchData.length === 0) {
      return <div>Nothing was found</div>;
    }

    return (
      <div className={cn(BLOCK_NAME)}>
        {this.props.searchData.map((data) => (
          <Card key={data.name} searchData={data} />
        ))}
      </div>
    );
  }
}
