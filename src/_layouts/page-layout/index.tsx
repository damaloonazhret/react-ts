import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { Component, PropsWithChildren } from 'react';

const BLOCK_NAME = 'Page-layout';
const cn = classnames.bind(styles);

type TProps = PropsWithChildren;

export class PageLayout extends Component<TProps> {
  render() {
    const { children } = this.props;
    return <div className={cn(BLOCK_NAME)}>{children}</div>;
  }
}
