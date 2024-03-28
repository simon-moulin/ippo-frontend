function timeAgo(date: Date): string {
  const currentDate: Date = new Date();
  const timestamp: number = currentDate.getTime() - date.getTime();

  const seconds: number = Math.floor(timestamp / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const months: number = Math.floor(days / 30); // approximation de mois à 30 jours

  if (months > 0) {
    return months === 1 ? "1 month" : months + "month";
  } else if (days > 0) {
    return days === 1 ? "1d" : days + "d";
  } else if (hours > 0) {
    return hours === 1 ? "1h" : hours + "h";
  } else if (minutes > 0) {
    return minutes === 1 ? "1min" : minutes + "min";
  } else {
    return "just now";
  }
}

export { timeAgo };
