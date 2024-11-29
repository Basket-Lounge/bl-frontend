'use client'

import ErrorHandler from "@/components/common/error/ErrorHandler"
import { AxiosError } from "axios"


export default function Error({
  error,
  reset
}: {
  error: AxiosError & { digest?: string }
  reset: () => void
}) {
  return <ErrorHandler error={error} reset={reset} />
}