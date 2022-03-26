export const getFormattedDateString = (date: Date): string => {
  const month = date.getMonth() + 1;
  const formattedMonth = month >= 10 ? month : '0' + month;

  const day = date.getDate();
  const formattedDay = day >= 10 ? day : '0' + day;

  return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
};
