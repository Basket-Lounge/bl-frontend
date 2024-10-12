interface TeamNameSet {
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
    id: number;
    teamname_set: TeamNameSet[];
    symbol: string;
    stats?: Stats;
}

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