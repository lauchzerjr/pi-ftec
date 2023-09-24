export const validationDate = (value: string): boolean => {
  if (value === undefined) {
    return false
  } 

  const parts = value?.split('/');

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  return date >= today;
}

export const validationTime = (value: string): boolean => {
  if (value === undefined) {
    return false
  } 

  const [hour, minute] = value?.split(':');
  const hourValue = parseInt(hour, 10);
  const minuteValue = parseInt(minute, 10);

  if (hourValue < 0 || hourValue > 23 || minuteValue < 0 || minuteValue > 59) {
    return false;
  }

  return true;
}