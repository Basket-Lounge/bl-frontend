'use client'

interface IError {
  reset: () => void
}

export default function Error401({ reset }: IError) {
  return (
    <div 
      className="flex flex-col gap-[24px] items-center justify-center grow py-[48px]" 
      aria-errormessage="401"
      aria-invalid="true"
    >
      <h1 className="text-gray-400 font-semibold text-[48px]">401</h1>
      <h1 className="text-gray-400 font-semibold text-[32px]">‧₊˚ ☁️⋅♡🪐༘⋆</h1>
      <p 
        className="text-gray-400 font-semibold text-[24px]"
        id="401"
      >
        로그인이 필요합니다.
      </p>
    </div>
  )
}