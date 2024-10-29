import { Player } from "@/models/player.models";


export const getPositionInKoreanFromAbbreviation = (position: string): string => {
  const firstLetter = position[0];
  if (firstLetter === "G") {
    return "가드";
  } else if (firstLetter === "F") {
    return "포워드";
  }
  return "센터";
}

export const filterPlayersByPosition = (players: Player[], position: string): Player[] => {
  if (position === "A") {
    return players;
  }
  return players.filter(player => player.position.includes(position));
}