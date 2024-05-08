import { compareAsc, parse } from "date-fns";

export function sortDates(a: string, b: string) {
  const dateA = parse(a, "dd/MM/yyyy", new Date());
  const dateB = parse(b, "dd/MM/yyyy", new Date());
  return compareAsc(dateA, dateB);
}
