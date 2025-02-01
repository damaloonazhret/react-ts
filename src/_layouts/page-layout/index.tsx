import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { PropsWithChildren } from 'react';

const BLOCK_NAME = 'Page-layout';
const cn = classnames.bind(styles);

type TProps = PropsWithChildren;

export const PageLayout = ({ children }: TProps) => {
  return <div className={cn(BLOCK_NAME)}>{children}</div>;
};
