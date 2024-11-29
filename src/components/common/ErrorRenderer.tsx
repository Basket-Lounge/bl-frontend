import { AxiosError } from "axios";
import ErrorHandler from "./error/ErrorHandler";


export const ErrorRenderer = (
  { error, resetErrorBoundary }: { error: AxiosError; resetErrorBoundary: () => void }
) => {
  return (
    <ErrorHandler error={error} reset={resetErrorBoundary} />
  );
}