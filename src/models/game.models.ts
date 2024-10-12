import { Team } from "./team.models";

type TTeamWithoutStats = Omit<Team, "stats">;

export interface Game {
    game_id: string;
    line_scores: LineScore[];
    home_team: TTeamWithoutStats;
    visitor_team: TTeamWithoutStats;
    game_date_est: string;
    game_sequence: number;
    game_status_id: number;
    game_status_text: string;
    game_code: string;
    season: string;
    live_period: number;
    live_pc_time: string;
    natl_tv_broadcaster_abbreviation: string | null;
    home_tv_broadcaster_abbreviation: string | null;
    away_tv_broadcaster_abbreviation: string | null;
    live_period_time_bcast: string;
    arena_name: string;
    wh_status: boolean;
    wnba_commissioner_flag: boolean;
    available_pt_available: boolean;
    created_at: string;
    updated_at: string;
}

export interface LineScore {
    line_score_id: string;
    pts_qtr1: number | null;
    pts_qtr2: number | null;
    pts_qtr3: number | null;
    pts_qtr4: number | null;
    pts_ot1: number | null;
    pts_ot2: number | null;
    pts_ot3: number | null;
    pts_ot4: number | null;
    pts_ot5: number | null;
    pts_ot6: number | null;
    pts_ot7: number | null;
    pts_ot8: number | null;
    pts_ot9: number | null;
    pts_ot10: number | null;
    fg_pct: number | null;
    ft_pct: number | null;
    fg3_pct: number | null;
    ast: number | null;
    reb: number | null;
    tov: number | null;
    created_at: string;
    updated_at: string;
    team: number;
}