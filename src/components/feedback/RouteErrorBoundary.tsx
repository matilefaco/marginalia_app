import React, { ErrorInfo, ReactNode } from "react";
import { PageError } from "./PageError";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryKey: number;
}

export class RouteErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    retryKey: 0
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryKey: 0 };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[RouteErrorBoundary] caught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      retryKey: prevState.retryKey + 1
    }));
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto max-w-lg p-6">
          <PageError 
            error={this.state.error || undefined} 
            resetErrorBoundary={this.handleReset} 
          />
        </div>
      );
    }

    return (
      <React.Fragment key={this.state.retryKey}>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default RouteErrorBoundary;
