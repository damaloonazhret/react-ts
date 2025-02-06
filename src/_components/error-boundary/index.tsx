import { PureComponent, ReactNode } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';

type TProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type TState = {
  hasError: boolean;
  error?: Error;
};

const cn = classNames.bind(style);
const BLOCK_NAME = 'Error-boundary';

export class ErrorBoundary extends PureComponent<TProps, TState> {
  state: TState = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): TState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in component:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={cn(BLOCK_NAME)}>
          {this.props.fallback || (
            <>
              <h2 className={cn(`${BLOCK_NAME}__title`)}>
                Something went wrong! 😵
              </h2>
              <p className={cn(`${BLOCK_NAME}__message`)}>
                {this.state.error?.message}
              </p>
              <button
                className={cn(`${BLOCK_NAME}__button`)}
                onClick={this.handleReload}
              >
                Try again
              </button>
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
