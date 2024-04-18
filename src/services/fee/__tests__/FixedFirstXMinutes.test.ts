import { LocalTime } from "@js-joda/core";
import { FixedFirstXMinutes } from "../FixedFirstXMinutes";

describe("FixedFirstXMinutes", () => {
  const configStartTime = "10:00";
  const configEndTime = "16:00";
  const configX = 120;
  const configY = 15;
  const configXMinutesFee = 5;
  const configSubsequenceChargePerYMinutes = 0.55;
  const fixedFeePerXMinutes = new FixedFirstXMinutes(
    configStartTime,
    configEndTime,
    configX,
    configXMinutesFee,
    configY,
    configSubsequenceChargePerYMinutes
  );
  const mockFitResult = {
    startTime: LocalTime.of(10, 0),
    endTime: LocalTime.of(11, 0),
    isFit: true,
  };
  describe("calculateCost", () => {
    it("should return x minutes fee and the subsequence charge for parking duration 10:00 to 13:00", () => {
      const endTime = LocalTime.of(13, 0);
      expect(
        fixedFeePerXMinutes.calculateCost({ ...mockFitResult, endTime })
      ).toBe(configXMinutesFee + configSubsequenceChargePerYMinutes * 4);
    });

    // task #1
    // TODO: implement more test cases for the calculateCost method
  });
});
