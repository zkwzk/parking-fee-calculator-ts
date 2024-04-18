import { LocalTime } from "@js-joda/core";
import { FitResult } from "../../../types";
import { parseTimeString } from "../../../utils";
import { BaseFee } from "../BaseFee";

describe("BaseFee", () => {
  const configStartTime = "10:00";
  const configEndTime = "12:00";
  const feeRate = 5;
  const mockFitResult: FitResult = {
    startTime: parseTimeString(configStartTime),
    endTime: parseTimeString(configEndTime),
    isFit: true,
  };
  const baseFee = new BaseFee(configStartTime, configEndTime);
  describe("isFit", () => {
    it("should return true if the given start and end times are within the configured range", () => {
      const startTime = LocalTime.parse("10:30");
      const endTime = LocalTime.parse("11:30");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime).toBe(startTime);
      expect(fitResult.endTime).toBe(endTime);
    });

    // task #2
    // TODO: implement more test cases for the isFit method
  });

  describe("calculateCost", () => {
    it("should throw an error if not implemented", () => {
      expect(() => baseFee.calculateCost(mockFitResult)).toThrow(
        "Method not implemented."
      );
    });
  });
});
