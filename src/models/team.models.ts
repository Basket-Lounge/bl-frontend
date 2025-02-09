import { LineScore } from "./game.models";

export type TSection = "general-info" | "players" | "schedule" | "posts";

export interface TeamNameSet {
    language: {
        name: string;
    };
    name: string;
}

interface Stats {
    LeagueID: string;
    SeasonID: string;
    TeamID: number;
    TeamCity: string;
    TeamName: string;
    TeamSlug: string;
    Conference: string;
    ConferenceRecord: string;
    PlayoffRank: number;
    ClinchIndicator: string;
    Division: string;
    DivisionRecord: string;
    DivisionRank: number;
    WINS: number;
    LOSSES: number;
    WinPCT: number;
    LeagueRank: number | null;
    Record: string;
    HOME: string;
    ROAD: string;
    L10: string;
    Last10Home: string;
    Last10Road: string;
    OT: string;
    ThreePTSOrLess: string;
    TenPTSOrMore: string;
    LongHomeStreak: number;
    strLongHomeStreak: string;
    LongRoadStreak: number;
    strLongRoadStreak: string;
    LongWinStreak: number;
    LongLossStreak: number;
    CurrentHomeStreak: number;
    strCurrentHomeStreak: string;
    CurrentRoadStreak: number;
    strCurrentRoadStreak: string;
    CurrentStreak: number;
    strCurrentStreak: string;
    ConferenceGamesBack: number;
    DivisionGamesBack: number;
    ClinchedConferenceTitle: number;
    ClinchedDivisionTitle: number;
    ClinchedPlayoffBirth: number;
    ClinchedPlayIn: number;
    EliminatedConference: number;
    EliminatedDivision: number;
    AheadAtHalf: string;
    BehindAtHalf: string;
    TiedAtHalf: string;
    AheadAtThird: string;
    BehindAtThird: string;
    TiedAtThird: string;
    Score100PTS: string;
    OppScore100PTS: string;
    OppOver500: string;
    LeadInFGPCT: string;
    LeadInReb: string;
    FewerTurnovers: string;
    PointsPG: number;
    OppPointsPG: number;
    DiffPointsPG: number;
    vsEast: string;
    vsAtlantic: string;
    vsCentral: string;
    vsSoutheast: string;
    vsWest: string;
    vsNorthwest: string;
    vsPacific: string;
    vsSouthwest: string;
    Jan: string | null;
    Feb: string | null;
    Mar: string | null;
    Apr: string | null;
    May: string | null;
    Jun: string | null;
    Jul: string | null;
    Aug: string | null;
    Sep: string | null;
    Oct: string | null;
    Nov: string | null;
    Dec: string | null;
    Score_80_Plus: string;
    Opp_Score_80_Plus: string;
    Score_Below_80: string;
    Opp_Score_Below_80: string;
    TotalPoints: number;
    OppTotalPoints: number;
    DiffTotalPoints: number;
    LeagueGamesBack: number;
    PlayoffSeeding: number | null;
    ClinchedPostSeason: number;
    NEUTRAL: string;
}

export interface Team {
    id: string;
    teamname_set: TeamNameSet[];
    symbol: string;
    stats?: Stats;
    linescore?: LineScore;
    favorite?: boolean;
}

export interface TeamWithLikes extends Team {
    likes_count: number;
    liked?: boolean;
}

export type TTeamLikesResult = Pick<TeamWithLikes, "id" | "symbol" | "likes_count" | "liked">;

export type TTeamWithoutTeamNameSet = Omit<Team, "teamname_set">;

export interface TeamFranchiseHistory {
    LEAGUE_ID: string;
    TEAM_ID: number;
    TEAM_CITY: string;
    TEAM_NAME: string;
    START_YEAR: string;
    END_YEAR: string;
    YEARS: number;
    GAMES: number;
    WINS: number;
    LOSSES: number;
    WIN_PCT: number;
    PO_APPEARANCES: number;
    DIV_TITLES: number;
    CONF_TITLES: number;
    LEAGUE_TITLES: number;
}

export interface ConferenceTeam {
    TeamID: number;
    TeamCity: string;
    TeamName: string;
    TeamAbbreviation: string;
    Conference: string;
    ConferenceRecord: string;
    WINS: number;
    LOSSES: number;
    WinPCT: number;
    HOME: string;
    ROAD: string;
    L10: string;
    PlayoffSeeding: number | null;
    ClinchedPostSeason: number;
}

export interface ConferenceStandings {
    East: ConferenceTeam[];
    West: ConferenceTeam[];
}

export interface TeamPost {
    id: string;
    title: string;
    content?: string;
    created_at: string;
    updated_at: string;
    user_data: {
        id: number;
        username: string;
        favorite_team: {
            id: number;
            symbol: string;
        } | null;
    },
    team_data: {
        id: number;
        symbol: string;
        teamname_set: TeamNameSet[];
    },
    status_data: TeamPostStatus;
    likes_count: number;
    comments_count: number;
    liked?: boolean;
}

export interface TeamPostError {
    title: string[][];
    content: string[][];
}

export interface TeamPostStatus {
  id: number;
  name: 'created' | 'deleted' | 'hidden';
  poststatusdisplayname_set: {
    language_data: {
      name: string;
    };
    display_name: string;
  }[];
}

export interface TeamPostCommentStatus {
  id: number;
  name: 'created' | 'deleted';
  postcommentstatusdisplayname_set: {
    language_data: {
      name: string;
    };
    display_name: string;
  }[];
}

export type TTeamPostsFilter = "all" | "recent" | "popular";

export interface TeamPostComment {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    replies_count: number;
    likes_count: number;
    liked?: boolean;
    user_data: {
        id: number;
        username: string;
        favorite_team: {
            id: number;
            symbol: string;
        } | null;
    };
    status_data: {
        id: number;
        name: string;
    }
}

export interface TeamPostCommentReply {
    id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_data: {
        id: number;
        username: string;
        favorite_team: {
            id: number;
            symbol: string;
        } | null;
    };
    status_data: {
        id: number;
        name: string;
    }
}

export interface TeamPostCommentLikes {
  id: string;
  likes_count: number;
  liked?: boolean;
}