export interface Player {
  PERSON_ID: number;
  PLAYER_LAST_NAME: string;
  PLAYER_FIRST_NAME: string;
  PLAYER_SLUG: string;
  TEAM_SLUG: string;
  TEAM_ID: number;
  TEAM_CITY: string;
  TEAM_NAME: string;
  TEAM_ABBREVIATION: string;
  JERSEY_NUMBER: string | null;
  POSITION: string;
  HEIGHT: string;
  WEIGHT: string;
  COLLEGE: string;
  COUNTRY: string;
  DRAFT_YEAR: number | null;
  DRAFT_ROUND: number | null;
  DRAFT_NUMBER: number | null;
  ROSTER_STATUS: number;
  FROM_YEAR: string;
  TO_YEAR: string;
  PTS: number | null;
  REB: number | null;
  AST: number | null;
  STATS_TIMEFRAME: string;
}
  