export function timeAgoEnglish(isoString: string): string {
  const createdTime = new Date(isoString).getTime();
  const currentTime = Date.now();
  const diffInSeconds = Math.floor((currentTime - createdTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  }
}

export function timeAgoKorean(isoString: string): string {
  const createdTime = new Date(isoString).getTime();
  const currentTime = Date.now();
  const diffInSeconds = Math.floor((currentTime - createdTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
}

export function timeUntilKorean(isoString: string): string {
  const createdTime = new Date(isoString).getTime();
  const currentTime = Date.now();
  const diffInSeconds = Math.floor((createdTime - currentTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 후`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 후`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 후`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 후`;
  }
}

export function formatDateInUTC(date: Date) : string {
  // Ensure the date is a valid Date object
  if (!(date instanceof Date)) {
      throw new Error("Invalid date");
  }

  // Get the individual components of the date
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  // Construct the formatted date string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

// // Example usage
// const isoString = "2025-01-07T12:05:19.951196Z";
// console.log(timeAgoEnglish(isoString)); // e.g., "10 seconds ago"
// console.log(timeAgoKorean(isoString));  // e.g., "10초 전"