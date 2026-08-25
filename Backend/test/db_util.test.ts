import { Day } from "../src/types/enums.js";
import { getDays, addDays } from "../src/util/db_util.js";

describe('"getDays" DB util function', () => {
  it("returns a single day correctly", () => {
    expect(getDays(1)).toEqual([Day.SUNDAY]);
    expect(getDays(2)).toEqual([Day.MONDAY]);
    expect(getDays(4)).toEqual([Day.TUESDAY]);
    expect(getDays(8)).toEqual([Day.WEDNESDAY]);
    expect(getDays(16)).toEqual([Day.THURSDAY]);
    expect(getDays(32)).toEqual([Day.FRIDAY]);
    expect(getDays(64)).toEqual([Day.SATURDAY]);
  });

  it("returns multible days correctly", () => {
    expect(getDays(3)).toEqual([Day.SUNDAY, Day.MONDAY]);
    expect(getDays(21)).toEqual([Day.SUNDAY, Day.TUESDAY, Day.THURSDAY]);
    expect(getDays(10)).toEqual([Day.MONDAY, Day.WEDNESDAY]);
    expect(getDays(127)).toEqual([
      Day.SUNDAY,
      Day.MONDAY,
      Day.TUESDAY,
      Day.WEDNESDAY,
      Day.THURSDAY,
      Day.FRIDAY,
      Day.SATURDAY,
    ]);
  });

  it("return null when day not (1-127)", () => {
    expect(getDays(0)).toBeNull();
    expect(getDays(-1)).toBeNull();
    expect(getDays(128)).toBeNull();
  });
});

describe('"add" DB util function', () => {
  it("add a single day successfully", () => {
    expect(addDays(new Set<Day>([Day.SUNDAY]))).toBe(1);
    expect(addDays(new Set<Day>([Day.MONDAY]))).toBe(2);
    expect(addDays(new Set<Day>([Day.TUESDAY]))).toBe(4);
    expect(addDays(new Set<Day>([Day.WEDNESDAY]))).toBe(8);
    expect(addDays(new Set<Day>([Day.THURSDAY]))).toBe(16);
    expect(addDays(new Set<Day>([Day.FRIDAY]))).toBe(32);
    expect(addDays(new Set<Day>([Day.SATURDAY]))).toBe(64);
  });

  it("add multiple days successfully", () => {
    expect(addDays(new Set<Day>([Day.SUNDAY, Day.SATURDAY]))).toBe(65);
    expect(addDays(new Set<Day>([Day.SUNDAY, Day.TUESDAY, Day.THURSDAY]))).toBe(
      21,
    );
    expect(addDays(new Set<Day>([Day.MONDAY, Day.WEDNESDAY]))).toBe(10);
    expect(
      addDays(
        new Set<Day>([
          Day.SUNDAY,
          Day.MONDAY,
          Day.TUESDAY,
          Day.WEDNESDAY,
          Day.THURSDAY,
          Day.FRIDAY,
          Day.SATURDAY,
        ]),
      ),
    ).toBe(127);
  });

  it("doesnt count repeated days", () => {
    expect(
      addDays(
        new Set<Day>([
          Day.SUNDAY,
          Day.MONDAY,
          Day.TUESDAY,
          Day.WEDNESDAY,
          Day.THURSDAY,
          Day.FRIDAY,
          Day.SATURDAY,
          Day.SUNDAY,
        ]),
      ),
    ).toBe(127);

    expect(addDays(new Set<Day>([Day.SUNDAY, Day.SUNDAY]))).toBe(1);
  });

  it("throws error when passing empty set", () => {
    expect(() => addDays(new Set<Day>())).toThrow(
      Error("you cant pass 0 elements to 'addDays'"),
    );
  });
});
