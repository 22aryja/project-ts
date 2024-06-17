export const DateUtils = {
  getDay: (date: string) => new Date(date).getDay(),
  getMonth: (date: string) => new Date(date).getMonth(),
  getFullYear: (date: string) => new Date(date).getFullYear(),
  parseDate: (date: string) => new Date(date),
};
