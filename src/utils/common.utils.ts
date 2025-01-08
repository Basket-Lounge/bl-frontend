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

// // Example usage
// const isoString = "2025-01-07T12:05:19.951196Z";
// console.log(timeAgoEnglish(isoString)); // e.g., "10 seconds ago"
// console.log(timeAgoKorean(isoString));  // e.g., "10초 전"