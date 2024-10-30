'use client'

import { AxiosError } from "axios"

interface IError {
  reset: () => void
}

export default function Error500({ reset }: IError) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
  }

  return (
    <div className="flex flex-col gap-[24px] items-center justify-center grow py-[48px]">
      <h1 className="text-gray-400 font-semibold text-[48px]">500</h1>
      <h1 className="text-gray-400 font-semibold text-[32px]">‧₊˚ ☁️⋅♡🪐༘⋆</h1>
      <p className="text-gray-400 font-semibold text-[24px]">서버에 문제가 발생했습니다.</p>
      <button 
        className="bg-color1 text-white py-[12px] px-[32px] rounded-full"
        onClick={handleClick}
      >
        다시 시도
      </button>
    </div>
  )
}