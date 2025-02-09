import { Link } from 'react-router';
import classNames from 'classnames/bind';
import style from './index.module.scss';
const cn = classNames.bind(style);
const BLOCK_NAME = 'Not-found';

export const NotFound = () => {
  return (
    <div className={cn(BLOCK_NAME)}>
      <h2 className={cn(`${BLOCK_NAME}__title`)}>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className={cn(`${BLOCK_NAME}__link`)} to="/page/1">
        Go to Home
      </Link>
    </div>
  );
};
