'use client'

import TeamHeaderLikeButtonSpinner from "@/components/team-page/TeamHeaderLikeButtonSpinner"

export default function Loading() {
  return (
    <div className="p-[24px] flex flex-col gap-[16px] items-center justify-center">
      <TeamHeaderLikeButtonSpinner />
    </div>
  )
}