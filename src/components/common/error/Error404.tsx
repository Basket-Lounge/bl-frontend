'use client'

import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

interface IError {
  reset: () => void
}

export default function Error404({ reset }: IError) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-[24px] items-center justify-center grow py-[48px]">
      <h1 className="text-gray-400 font-semibold text-[48px]">404</h1>
      <h1 className="text-gray-400 font-semibold text-[32px]">( ꩜ ᯅ ꩜;)⁭ ⁭</h1>
      <p className="text-gray-400 font-semibold text-[24px]">원하시는 페이지를 찾을 수 없습니다.</p>
      <button 
        className="bg-color1 text-white py-[12px] px-[32px] rounded-full"
        onClick={handleClick}
      >
        홈으로 이동
      </button>
    </div>
  )
}