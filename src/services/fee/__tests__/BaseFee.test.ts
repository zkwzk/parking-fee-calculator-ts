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

    it("should return false if the given start and end times are outside the configured range", () => {
      const startTime = LocalTime.parse("09:00");
      const endTime = LocalTime.parse("09:59");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(false);
    });

    it("should return configEndTime if stay longer than the configured end time", () => {
      const startTime = LocalTime.parse("11:30");
      const endTime = LocalTime.parse("13:00");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime!.equals(startTime)).toBeTruthy;
      expect(fitResult.endTime!.equals(configEndTime)).toBeTruthy;
    });

    it("should return configedStartTime if entry earlier than the configured start time", () => {
      const startTime = LocalTime.parse("09:30");
      const endTime = LocalTime.parse("10:30");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime).toStrictEqual(
        parseTimeString(configStartTime)
      );
      expect(fitResult.endTime).toBe(endTime);
    });
  });

  describe("calculateCost", () => {
    it("should throw an error if not implemented", () => {
      expect(() => baseFee.calculateCost(mockFitResult)).toThrow(
        "Method not implemented."
      );
    });
  });
});
