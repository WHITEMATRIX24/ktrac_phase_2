export const dateToLocaleFormater = (date?: string) => {
  if (date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  } else {
    return "";
  }
};
