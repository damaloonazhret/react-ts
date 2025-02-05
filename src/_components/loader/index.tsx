import classNames from 'classnames/bind';
import style from './index.module.scss'; // Подключаем стили

interface LoaderProps {
  size?: number;
  color?: string;
  speed?: string;
}

const cn = classNames.bind(style);
const BLOCK_NAME = 'Loader';

export function Loader({
  size = 50,
  color = '#3498db',
  speed = '1s',
}: LoaderProps) {
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
