import React, { ErrorInfo, ReactNode } from "react";
import { PageError } from "./PageError";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RouteErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[RouteErrorBoundary] caught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
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

    return this.props.children;
  }
}

export default RouteErrorBoundary;
