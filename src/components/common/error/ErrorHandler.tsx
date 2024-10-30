import { AxiosError } from "axios";
import Error401 from "./Error401";
import Error403 from "./Error403";
import Error404 from "./Error404";
import Error500 from "./Error500";



const ErrorHandler = ({ error, reset }: { 
  error: AxiosError & { digest?: string }, 
  reset: () => void 
}) => {
  if (error.response?.status === 401) {
    return <Error401 reset={reset} />
  } else if (error.response?.status === 403) {
    return <Error403 reset={reset} />
  } else if (error.response?.status === 404) {
    return <Error404 reset={reset} />
  } else {
    return <Error500 reset={reset} />
  }
}

export default ErrorHandler;