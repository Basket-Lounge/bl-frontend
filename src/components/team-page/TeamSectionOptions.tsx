'use client'

import TeamSectionOptionButton from "./TeamSectionOptionButton";


export default function TeamSectionOptions() {
  return (
    <section className="flex gap-[24px] pb-[4px] border-b" aria-label="team-section-options">
      <TeamSectionOptionButton designatedSection="general-info" name="일반정보" />
      <TeamSectionOptionButton designatedSection="schedule" name="스케쥴" />
      <TeamSectionOptionButton designatedSection="players" name="선수" />
      <TeamSectionOptionButton designatedSection="posts" name="팬 소통 공간" />
    </section>
  )
}