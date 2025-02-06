import { PureComponent } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss'; // Подключаем стили

interface LoaderProps {
  size?: number;
  color?: string;
  speed?: string;
}

const cn = classNames.bind(style);
const BLOCK_NAME = 'Loader';

export class Loader extends PureComponent<LoaderProps> {
  static defaultProps: LoaderProps = {
    size: 50,
    color: '#3498db',
    speed: '1s',
  };

  render() {
    const { size, color, speed } = this.props;

    return (
      <div className={cn(BLOCK_NAME)}>
        <div
          className={cn(`${BLOCK_NAME}__circular`)}
          style={{
            width: size,
            height: size,
            borderColor: color,
            animationDuration: speed,
          }}
        />
      </div>
    );
  }
}
