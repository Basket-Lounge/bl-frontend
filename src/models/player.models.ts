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
  stats: PlayerSeasonStats[];
}

export interface PlayerSeasonStats {
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

export interface PlayerGameStats {
  SEASON_YEAR: string;
  PLAYER_ID: number;
  PLAYER_NAME: string;
  NICKNAME: string;
  TEAM_ID: number;
  TEAM_ABBREVIATION: string;
  TEAM_NAME: string;
  GAME_ID: string;
  GAME_DATE: string; // ISO date format
  MATCHUP: string;
  WL: string; // Win/Loss indicator ('W' or 'L')
  MIN: number; // Minutes played in decimal format
  FGM: number; // Field Goals Made
  FGA: number; // Field Goals Attempted
  FG_PCT: number; // Field Goal Percentage
  FG3M: number; // Three-Point Field Goals Made
  FG3A: number; // Three-Point Field Goals Attempted
  FG3_PCT: number; // Three-Point Field Goal Percentage
  FTM: number; // Free Throws Made
  FTA: number; // Free Throws Attempted
  FT_PCT: number; // Free Throw Percentage
  OREB: number; // Offensive Rebounds
  DREB: number; // Defensive Rebounds
  REB: number; // Total Rebounds
  AST: number; // Assists
  TOV: number; // Turnovers
  STL: number; // Steals
  BLK: number; // Blocks
  BLKA: number; // Blocked Attempts
  PF: number; // Personal Fouls
  PFD: number; // Personal Fouls Drawn
  PTS: number; // Points
  PLUS_MINUS: number; // Plus/Minus
  NBA_FANTASY_PTS: number; // NBA Fantasy Points
  DD2: number; // Double-Doubles
  TD3: number; // Triple-Doubles
  WNBA_FANTASY_PTS: number; // WNBA Fantasy Points
  GP_RANK: number; // Games Played Rank
  W_RANK: number; // Win Rank
  L_RANK: number; // Loss Rank
  W_PCT_RANK: number; // Win Percentage Rank
  MIN_RANK: number; // Minutes Rank
  FGM_RANK: number; // Field Goals Made Rank
  FGA_RANK: number; // Field Goals Attempted Rank
  FG_PCT_RANK: number; // Field Goal Percentage Rank
  FG3M_RANK: number; // Three-Point Field Goals Made Rank
  FG3A_RANK: number; // Three-Point Field Goals Attempted Rank
  FG3_PCT_RANK: number; // Three-Point Field Goal Percentage Rank
  FTM_RANK: number; // Free Throws Made Rank
  FTA_RANK: number; // Free Throws Attempted Rank
  FT_PCT_RANK: number; // Free Throw Percentage Rank
  OREB_RANK: number; // Offensive Rebounds Rank
  DREB_RANK: number; // Defensive Rebounds Rank
  REB_RANK: number; // Rebounds Rank
  AST_RANK: number; // Assists Rank
  TOV_RANK: number; // Turnovers Rank
  STL_RANK: number; // Steals Rank
  BLK_RANK: number; // Blocks Rank
  BLKA_RANK: number; // Blocked Attempts Rank
  PF_RANK: number; // Personal Fouls Rank
  PFD_RANK: number; // Personal Fouls Drawn Rank
  PTS_RANK: number; // Points Rank
  PLUS_MINUS_RANK: number; // Plus/Minus Rank
  NBA_FANTASY_PTS_RANK: number; // NBA Fantasy Points Rank
  DD2_RANK: number; // Double-Doubles Rank
  TD3_RANK: number; // Triple-Doubles Rank
  WNBA_FANTASY_PTS_RANK: number; // WNBA Fantasy Points Rank
  AVAILABLE_FLAG: number; // Availability Flag
  MIN_SEC: string; // Minutes in "MM:SS" format
}