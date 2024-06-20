export const DateUtils = {
  getDay: (date: string) => new Date(date).getDay(),
  getMonth: (date: string) => new Date(date).getMonth(),
  getFullYear: (date: string) => new Date(date).getFullYear(),
  parseDate: (date: string) => new Date(date),
  splitDate: (date: string) => {
    let [datePart, timePart] = date.split(" ");
    let [day, month, year] = datePart.split("/");
    return `${year}-${month}-${day}T${timePart}`;
  },
  formatDate: (date: string) => replaceAll(date, "/", "-"),
};

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
