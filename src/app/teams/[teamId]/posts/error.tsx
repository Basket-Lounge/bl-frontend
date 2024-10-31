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
  // return (
  //   <div className="flex flex-col gap-[24px] items-center justify-center grow py-[48px]">
  //     <h1 className="text-gray-400 font-semibold text-[48px]">{error.response?.status}</h1>
  //     <h1 className="text-gray-400 font-semibold text-[32px]">( ꩜ ᯅ ꩜;)⁭ ⁭</h1>
  //     <p className="text-gray-400 font-semibold text-[24px]">원하시는 페이지를 찾을 수 없습니다.</p>
  //     <button 
  //       className="bg-color1 text-white py-[12px] px-[32px] rounded-full"
  //       onClick={() => reset()}
  //     >
  //       다시 시도
  //     </button>
  //   </div>
  // )

  return <ErrorHandler error={error} reset={reset} />
}