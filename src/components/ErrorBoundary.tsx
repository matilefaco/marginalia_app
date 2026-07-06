import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  props!: Props;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center border border-dashed border-[#BDAB9C]/40 rounded-xl bg-[#FAF8F3]/60 my-4 space-y-3">
          <p className="text-sm font-serif italic text-[#3D3D3D]">
            {this.props.fallbackMessage || "Seu Mapa da Alma ainda está sendo desenhado."}
          </p>
          <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-wider">
            Sua sensibilidade literária está se alinhando com as estrelas...
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
