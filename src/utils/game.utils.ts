import { Game, LineScore, PlayerStatistics } from "@/models/game.models";


export const calculateTotalPoints = (lineScore: LineScore) => {
  return [
    lineScore.pts_qtr1 || 0, 
    lineScore.pts_qtr2 || 0,
    lineScore.pts_qtr3 || 0,
    lineScore.pts_qtr4 || 0,
    lineScore.pts_ot1 || 0,
    lineScore.pts_ot2 || 0,
    lineScore.pts_ot3 || 0,
    lineScore.pts_ot4 || 0,
    lineScore.pts_ot5 || 0,
    lineScore.pts_ot6 || 0,
    lineScore.pts_ot7 || 0,
    lineScore.pts_ot8 || 0,
    lineScore.pts_ot9 || 0,
    lineScore.pts_ot10 || 0
  ].reduce((acc, cur) => acc + (cur || 0), 0);
}

export const extractOnlyValidPeriods = (lineScore: LineScore) => {
  const validPeriods = [
    lineScore.pts_qtr1,
    lineScore.pts_qtr2,
    lineScore.pts_qtr3,
    lineScore.pts_qtr4,
    lineScore.pts_ot1,
    lineScore.pts_ot2,
    lineScore.pts_ot3,
    lineScore.pts_ot4,
    lineScore.pts_ot5,
    lineScore.pts_ot6,
    lineScore.pts_ot7,
    lineScore.pts_ot8,
    lineScore.pts_ot9,
    lineScore.pts_ot10
  ];

  return validPeriods.filter(period => period !== null);
}

export const convertESTtoLocalTime = (date: string | Date, timeInEST: string) => {
  // Convert the ET time to 24-hour format and adjust for timezone (ET is UTC-4 or UTC-5 depending on daylight savings)
  // October is during daylight savings, so ET is UTC-4
  if (typeof date === 'string')
    date = new Date(date);

  const [time, modifier] = timeInEST.split(' '); // Split the time and "pm"
  let [hours, minutes] = time.split(':').map(Number); // Split hours and minutes

  // Convert to 24-hour format based on AM/PM
  if (modifier.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (modifier.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

// Set the time on the original date
// ET is UTC-4 during daylight saving time, so add 4 hours to get the UTC time
  date.setUTCHours(hours + 4, minutes);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  date = new Date(date.toLocaleString('en-US', { timeZone: userTimeZone }));
  return date;
};

export const convertUTCtoLocalTime = (date: string | Date) => {
  if (typeof date === 'string')
    date = new Date(date);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  date = new Date(date.toLocaleString('en-US', { timeZone: userTimeZone }));
  return date;
}

export const displayGameTimeForGameBox = (date: string | Date) => {
  date = convertUTCtoLocalTime(date);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
}

export const displayLiveGameTimeForGameBox = (liveStatusId: number, livePeriod: number, timeLeftString: string) => {
  if (liveStatusId <= 0 && liveStatusId > 3) {
    return '';
  }

  if (liveStatusId === 1) {
    return displayGameTimeForGameBox(new Date());
  }

  if (liveStatusId === 3) {
    return `경기 종료`;
  }

  return `${livePeriod}쿼터 | ${timeLeftString.trim()}`;
}

export const filterGamesByMonth = (games: Game[], month: string) => {
  const filteredGames : Game[] = [];

  for (const game of games) {
    const gameDate = convertUTCtoLocalTime(game.game_date_est);
    if (month == '0') {
      filteredGames.push(game);
    } else {
      if (gameDate.getMonth() + 1 == parseInt(month)) {
        filteredGames.push(game);
      }
    }
  }

  return filteredGames;
}

export const filterTodayGames = (games: Game[]) => {
  const today = new Date();
  const filteredGames : Game[] = [];

  for (const game of games) {
    const gameDate = convertUTCtoLocalTime(game.game_date_est);
    if (gameDate.getDate() == today.getDate() && gameDate.getMonth() == today.getMonth()) {
      filteredGames.push(game);
    }
  }

  return filteredGames;
}

export const sortGamesByDate = (games: Game[]) => {
  const gamesByDate: [string, Game[]][] = [];

  for (const game of games) {
    const gameDate = convertUTCtoLocalTime(game.game_date_est);
    const dateKey = `${gameDate.getFullYear()}년 ${gameDate.getMonth() + 1}월 ${gameDate.getDate()}일`;

    const gameList = gamesByDate.find(([date, _]) => date === dateKey);

    if (gameList) {
      gameList[1].push(game);
    } else {
      gamesByDate.push([dateKey, [game]]);
    }
  }

  return gamesByDate;
}


export const getGameOutcome = (teamScore: LineScore, opponentScore: LineScore) => {
  const teamTotalPoints = calculateTotalPoints(teamScore);
  const opponentTotalPoints = calculateTotalPoints(opponentScore);

  if (teamTotalPoints > opponentTotalPoints) {
    return '승리';
  } else if (teamTotalPoints < opponentTotalPoints) {
    return '패배';
  } else {
    return '경기전';
  }
}

export const getTop4PlayersFromGame = (playersStats: PlayerStatistics[]) => {
  return playersStats.sort(
    (a, b) => (b.points + b.assists + b.rebounds_total + b.blocks + b.steals) - (a.points + a.assists + a.rebounds_total + a.blocks + a.steals)
  ).slice(0, 4);
}

export const filterPlayerStatsByTeam = (playersStats: PlayerStatistics[], teamId: number) => {
  return playersStats.filter(playerStat => playerStat.team.id === teamId);
};

export function formatPlayerGameTime(inputString: string): string | null {
  // Use a regular expression to extract minutes and seconds
  const match = inputString.match(/^PT(\d+)M(\d+\.\d+)S$/);

  if (match) {
      // Parse minutes and seconds
      const minutes = parseInt(match[1], 10);
      const seconds = Math.floor(parseFloat(match[2]));

      // Return formatted string with zero-padded seconds if necessary
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  } else {
      return null;  // Return null for invalid format
  }
}