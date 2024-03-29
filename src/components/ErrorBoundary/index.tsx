import React, { ErrorInfo } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};
type ErrorBoundaryProps = {
  children: JSX.Element;
};
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
  }
  render(): JSX.Element | React.ReactElement {
    if (this.state.hasError) {
      return <h2>Something went wrong!</h2>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
