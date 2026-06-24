import { describe, expect, it } from "vitest";
import { timeDiffMins } from "./state";

describe("timeDiffMins", () => {
  it("should calculate duration correctly for valid HH:MM inputs", () => {
    expect(timeDiffMins("09:00", "10:30")).toBe(90);
    expect(timeDiffMins("00:00", "23:59")).toBe(1439);
  });

  it("should return null for invalid formats", () => {
    expect(timeDiffMins("9:00", "10:00")).toBeNull();
    expect(timeDiffMins("09:00", "10:0")).toBeNull();
    expect(timeDiffMins("abc", "def")).toBeNull();
  });

  it("should return null for hours out of range (not 0-23)", () => {
    expect(timeDiffMins("24:00", "12:00")).toBeNull();
    expect(timeDiffMins("12:00", "25:00")).toBeNull();
    expect(timeDiffMins("99:15", "10:15")).toBeNull();
  });

  it("should return null for minutes out of range (not 0-59)", () => {
    expect(timeDiffMins("12:60", "13:00")).toBeNull();
    expect(timeDiffMins("12:00", "13:99")).toBeNull();
  });
});
