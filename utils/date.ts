export function convertToMilliseconds(
  date: string,
  hour: number,
  minutes: number,
  timePeriod: 'am' | 'pm'
): number {
  // Parse date string (YYYY-MM-DD)
  const [yearStr, monthStr, dayStr] = date.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // JS months are 0-based
  const day = parseInt(dayStr, 10);

  // Convert hour to 24-hour format
  let adjustedHour = hour;
  if (timePeriod === 'pm' && hour < 12) adjustedHour += 12;
  if (timePeriod === 'am' && hour === 12) adjustedHour = 0;

  // Create the Date object
  const dateObj = new Date(year, month, day, adjustedHour, minutes);

  // Return time in milliseconds
  return dateObj.getTime();
}

export function formatMilliseconds(ms: number, withoutTime?: boolean, shortHandMonth?: boolean): string {
  const date = new Date(ms);

  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const timePeriod = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  if (hours === 0) hours = 12;

  const formattedMinutes = minutes.toString().padStart(2, '0');

  return withoutTime
    ? `${day} ${shortHandMonth ? month.substring(0,3) : month} ${year}`
    : `${day} ${shortHandMonth ? month.substring(0,3) : month} ${year}, ${hours}:${formattedMinutes} ${timePeriod}`
}

export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp; // difference in ms
  const seconds = Math.floor(diff / 1000);

  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (days < 30) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (days < 365) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}