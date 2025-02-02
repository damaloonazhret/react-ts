import { PureComponent, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type TState = {
  hasError: boolean;
  error?: Error;
};

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
        <div style={styles.container}>
          {this.props.fallback || (
            <>
              <h2 style={styles.title}>Something went wrong! 😵</h2>
              <p style={styles.message}>{this.state.error?.message}</p>
              <button style={styles.button} onClick={this.handleReload}>
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

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '20px',
    background: '#f8d7da',
    color: '#721c24',
    borderRadius: '8px',
    margin: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
