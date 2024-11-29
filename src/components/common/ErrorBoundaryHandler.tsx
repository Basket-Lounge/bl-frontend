'use client';

import { ErrorBoundary } from "react-error-boundary";
import { ErrorRenderer } from "./ErrorRenderer";


export const ErrorBoundaryHandler = (
  { children }: {children: React.ReactNode}
) => {
  return (
    <ErrorBoundary fallbackRender={ErrorRenderer}>
      {children}
    </ErrorBoundary>
  );
}