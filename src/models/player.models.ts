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

export interface PlayerCareerStats {
  PLAYER_ID: number;
  SEASON_ID: string;
  LEAGUE_ID: string
  TEAM_ID: number;
  TEAM_ABBREVIATION: string;
  PLAYER_AGE: number;
  GP: number;           // Games Played
  GS: number;           // Games Started
  MIN: number;          // Minutes per Game
  FGM: number;          // Field Goals Made per Game
  FGA: number;          // Field Goals Attempted per Game
  FG_PCT: number;       // Field Goal Percentage
  FG3M: number;         // Three-Point Field Goals Made per Game
  FG3A: number;         // Three-Point Field Goals Attempted per Game
  FG3_PCT: number;      // Three-Point Field Goal Percentage
  FTM: number;          // Free Throws Made per Game
  FTA: number;          // Free Throws Attempted per Game
  FT_PCT: number;       // Free Throw Percentage
  OREB: number;         // Offensive Rebounds per Game
  DREB: number;         // Defensive Rebounds per Game
  REB: number;          // Total Rebounds per Game
  AST: number;          // Assists per Game
  STL: number;          // Steals per Game
  BLK: number;          // Blocks per Game
  TOV: number;          // Turnovers per Game
  PF: number;           // Personal Fouls per Game
  PTS: number;          // Points per Game
}