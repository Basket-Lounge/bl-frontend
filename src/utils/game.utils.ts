import { Game, LineScore } from "@/models/game.models";


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

export const displayGameTimeForGameBox = (date: string | Date, timeInEST: string) => {
  date = convertESTtoLocalTime(date, timeInEST);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
}

export const displayLiveGameTimeForGameBox = (liveStatusId: number, livePeriod: number, timeLeftString: string) => {
  if (liveStatusId <= 0 && liveStatusId > 3) {
    return '';
  }

  if (liveStatusId === 1) {
    return displayGameTimeForGameBox(new Date(), '12:00 PM');
  }

  if (liveStatusId === 3) {
    return `경기 종료`;
  }

  return `${livePeriod}쿼터 | ${timeLeftString.trim()}`;
}

export const filterGamesByMonth = (games: Game[], month: string) => {
  const filteredGames : Game[] = [];

  for (const game of games) {
    const gameDate = convertESTtoLocalTime(game.game_date_est, game.game_status_text);
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