export const dateToLocaleFormater = (date?: string) => {
  if (date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  } else {
    return "";
  }
};

export const getMonthNameFromYearMonth = (yearMonth: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month] = yearMonth.split("-");

  const monthName = months[parseInt(month, 10) - 1];

  return `${monthName} ${year}`;
};
