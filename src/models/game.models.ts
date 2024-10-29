import { Team } from "./team.models";

type TTeamWithoutStats = Omit<Team, "stats">;

export interface Game {
    game_id: string;
    line_scores?: LineScore[];
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
    team: TTeamWithoutStats;
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
}

export interface TeamStatistics {
    id: number;
    team: Team;
    assists: number;
    assists_turnover_ratio: number;
    bench_points: number;
    biggest_lead: number;
    biggest_lead_score: string;
    biggest_scoring_run: number;
    biggest_scoring_run_score: string;
    blocks: number;
    blocks_received: number;
    fast_break_points_attempted: number;
    fast_break_points_made: number;
    fast_break_points_percentage: number;
    field_goals_attempted: number;
    field_goals_effective_adjusted: number;
    field_goals_made: number;
    field_goals_percentage: number;
    fouls_offensive: number;
    fouls_drawn: number;
    fouls_personal: number;
    fouls_team: number;
    fouls_technical: number;
    fouls_team_technical: number;
    free_throws_attempted: number;
    free_throws_made: number;
    free_throws_percentage: number;
    lead_changes: number;
    minutes: string;
    points: number;
    points_against: number;
    points_fast_break: number;
    points_from_turnovers: number;
    points_in_the_paint: number;
    points_in_the_paint_attempted: number;
    points_in_the_paint_made: number;
    points_in_the_paint_percentage: number;
    points_second_chance: number;
    rebounds_defensive: number;
    rebounds_offensive: number;
    rebounds_personal: number;
    rebounds_team: number;
    rebounds_team_defensive: number;
    rebounds_team_offensive: number;
    rebounds_total: number;
    second_chance_points_attempted: number;
    second_chance_points_made: number;
    second_chance_points_percentage: number;
    steals: number;
    three_pointers_attempted: number;
    three_pointers_made: number;
    three_pointers_percentage: number;
    time_leading: string;
    times_tied: number;
    true_shooting_attempts: number;
    true_shooting_percentage: number;
    turnovers: number;
    turnovers_team: number;
    turnovers_total: number;
    two_pointers_attempted: number;
    two_pointers_made: number;
    two_pointers_percentage: number;
}

export interface IGameWithTeamStats extends Game {
    home_team_statistics: TeamStatistics;
    visitor_team_statistics: TeamStatistics;
}

export interface PlayerStatistics {
    id: number;
    player: {
        id: number;
        first_name: string;
        last_name: string;
    },
    team: {
        id: number;
    };
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


export interface IGameChatMessage {
    message: string;
    user: {
        id: number,
        username: string,
    },
    game: number,
    created_at: number,
}