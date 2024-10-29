'use client'

export default function TeamSocialSpace({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      {children}
    </div>
  )
}