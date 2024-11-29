import GameSectionOptionButton from "./GameSectionOptionButton";


export default function GameSectionOptions() {
  return (
    <div className="flex gap-[24px] pb-[4px] border-b">
      <GameSectionOptionButton designatedSection="summary" name="경기 요약" />
      <GameSectionOptionButton designatedSection="box-score" name="박스스코어" />
      <GameSectionOptionButton designatedSection="live-chat" name="실시간 채팅" />
    </div>
  )
}