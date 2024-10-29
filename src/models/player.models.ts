import { Team, TTeamWithoutTeamNameSet } from "./team.models";

export interface Player {
  id: number;
  team: Team;
  last_name: string;
  first_name: string;
  slug: string;
  jersey_number: string;
  position: string;
  height: string;
  weight: number;
  college: string;
  country: string;
  draft_year: number | null;
  draft_round: number | null;
  draft_number: number | null;
  roster_status: number;
  from_year: number;
  to_year: number;
  stats_timeframe: string;
  pts: number | null;
  reb: number | null;
  ast: number | null;
}

export interface PlayerCareerStats {
  id: number;
  team_data: TTeamWithoutTeamNameSet;
  season_id: string;
  player_age: number;
  games_played: number;
  games_started: number;
  minutes: number;
  field_goals_made: number;
  field_goals_attempted: number;
  field_goals_percentage: number;
  three_point_field_goals_made: number;
  three_point_field_goals_attempted: number;
  three_point_field_goals_percentage: number;
  free_throws_made: number;
  free_throws_attempted: number;
  free_throws_percentage: number;
  rebounds_offensive: number;
  rebounds_defensive: number;
  rebounds_total: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personal_fouls: number;
  points: number;
}

// {
//   "id": 4424,
//   "season_id": "2024-25",
//   "player_age": 21.0,
//   "games_played": 2,
//   "games_started": 2,
//   "minutes": 29.5,
//   "field_goals_made": 7.0,
//   "field_goals_attempted": 11.0,
//   "field_goals_percentage": 0.636,
//   "three_point_field_goals_made": 2.0,
//   "three_point_field_goals_attempted": 4.0,
//   "three_point_field_goals_percentage": 0.5,
//   "free_throws_made": 0.5,
//   "free_throws_attempted": 2.0,
//   "free_throws_percentage": 0.25,
//   "rebounds_offensive": 1.5,
//   "rebounds_defensive": 1.5,
//   "rebounds_total": 3.0,
//   "assists": 3.0,
//   "steals": 3.5,
//   "blocks": 1.5,
//   "turnovers": 1.0,
//   "personal_fouls": 4.5,
//   "points": 16.5
// }

export interface PlayerSeasonStats {
  id: number;
  season_id: string;
  player_age: number;
  games_played: number;
  games_started: number;
  minutes: number;
  field_goals_made: number;
  field_goals_attempted: number;
  field_goals_percentage: number;
  three_point_field_goals_made: number;
  three_point_field_goals_attempted: number;
  three_point_field_goals_percentage: number;
  free_throws_made: number;
  free_throws_attempted: number;
  free_throws_percentage: number;
  rebounds_offensive: number;
  rebounds_defensive: number;
  rebounds_total: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personal_fouls: number;
  points: number;
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

export interface PlayerGameStatistics {
  id: number;
  player: {
    id: number;
    first_name: string;
    last_name: string;
  };
  game_data: {
    home_team: TTeamWithoutTeamNameSet;
    visitor_team: TTeamWithoutTeamNameSet;
  };
  team: TTeamWithoutTeamNameSet;
  status: string;
  order: number;
  position: string | null;
  starter: boolean;
  assists: number;
  blocks: number;
  blocks_received: number;
  field_goals_attempted: number;
  field_goals_made: number;
  field_goals_percentage: number;
  fouls_offensive: number;
  fouls_drawn: number;
  fouls_personal: number;
  fouls_technical: number;
  free_throws_attempted: number;
  free_throws_made: number;
  free_throws_percentage: number;
  minus: number;
  minutes: string;
  plus: number;
  plus_minus_points: number;
  points: number;
  points_fast_break: number;
  points_in_the_paint: number;
  points_second_chance: number;
  rebounds_defensive: number;
  rebounds_offensive: number;
  rebounds_total: number;
  steals: number;
  three_pointers_attempted: number;
  three_pointers_made: number;
  three_pointers_percentage: number;
  turnovers: number;
  two_pointers_attempted: number;
  two_pointers_made: number;
  two_pointers_percentage: number;
}