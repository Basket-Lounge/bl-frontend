'use client'

import { Suspense } from "react";

export default function TeamPlayers({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </div>
  )
}