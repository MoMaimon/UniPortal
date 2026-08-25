import { Day } from "../types/enums.js";

function checkDay(days: number, day: Day): boolean {
  return Boolean(day & days);
}

export function getDays(days: number): Day[] | null {
  const days_arr: Day[] = [];

  if (days < 1 || days > 127) {
    return null;
  }

  for (const value of Object.values(Day)) {
    if (typeof value === "number" && checkDay(days, value)) {
      days_arr.push(value as Day);
    }
  }
  return days_arr;
}

export function addDays(days: Set<Day>): number {
  let result: number = 0;
  if (days.size == 0) {
    throw new Error("you cant pass 0 elements to 'addDays'");
  }
  days.forEach((day) => {
    result = result | day;
  });
  return result;
}
