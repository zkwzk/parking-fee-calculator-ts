import { LocalDate, LocalDateTime, LocalTime } from "@js-joda/core";
import { FeeCalculator } from "../FeeCalculator";
import {
  orchardCentralCarPark,
  plazaSingapuraCarPark,
  tscCarPark,
} from "../../../config";
import { VEHICLE_TYPE } from "../../../types";

describe("FeeCalculator", () => {
  const feeCalculator = new FeeCalculator();
  describe("checkGracePeriod", () => {
    it("should return true if the time difference is less than the grace period", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-01T10:14";
      expect(feeCalculator.checkGracePeriod(startTime, endTime, 15)).toBe(true);
    });

    it("should return false if the time difference is more than the grace period", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-01T10:16";
      expect(feeCalculator.checkGracePeriod(startTime, endTime, 15)).toBe(
        false
      );
    });
  });

  describe("calcaulateDays", () => {
    it("should return 3 days if the start and end time are 3 days apart", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-03T11:00";
      // 2021-01-01 is Friday
      // 2021-01-02 is Saturday
      const expectedResult = [
        {
          dayStartTime: LocalTime.parse("10:00"),
          dayEndTime: LocalTime.parse("23:59"),
          isWeekendOrPH: false,
        },
        {
          dayStartTime: LocalTime.parse("00:00"),
          dayEndTime: LocalTime.parse("23:59"),
          isWeekendOrPH: true,
        },
        {
          dayStartTime: LocalTime.parse("00:00"),
          dayEndTime: LocalTime.parse("11:00"),
          isWeekendOrPH: true,
        },
      ];
      expect(feeCalculator.calculateDays(startTime, endTime)).toStrictEqual(
        expectedResult
      );
    });

    it("should return 1 day if the start and end time are on the same day", () => {
      const startTime = "2021-01-02T10:00";
      const endTime = "2021-01-02T11:00";
      const expectedResult = [
        {
          dayStartTime: LocalTime.of(10, 0, 0),
          dayEndTime: LocalTime.of(11, 0, 0),
          isWeekendOrPH: true,
        },
      ];

      expect(feeCalculator.calculateDays(startTime, endTime)).toStrictEqual(
        expectedResult
      );
    });
  });

  describe("checkIsSameDay", () => {
    it("should return true if the start and end time are on the same day", () => {
      const startTime = "2021-01-01T10:00:00.000Z";
      const endTime = "2021-01-01T11:00:00.000Z";
      expect(feeCalculator.checkIsSameDay(startTime, endTime)).toBe(true);
    });
    it("should return false if the start and end time are not on the same day", () => {
      const startTime = "2021-01-01T10:00:00.000Z";
      const endTime = "2021-01-02T11:00:00.000Z";
      expect(feeCalculator.checkIsSameDay(startTime, endTime)).toBe(false);
    });
  });

  describe("checkIsWeekend", () => {
    it("should return true if the date is Saturday", () => {
      const date = LocalDate.of(2021, 1, 2);
      expect(feeCalculator.checkIsWeekend(date)).toBe(true);
    });
    it("should return true if the date is Sunday", () => {
      const date = LocalDate.of(2021, 1, 3);
      expect(feeCalculator.checkIsWeekend(date)).toBe(true);
    });

    it("should return false if the date is not weekend", () => {
      const date = LocalDate.of(2021, 1, 1);
      expect(feeCalculator.checkIsWeekend(date)).toBe(false);
    });
  });

  describe("calculateParkingFee", () => {
    it("should calculate the parking fee correctly for a 1-hour duration", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-01T11:00";
      const expectedFee = 1.95;
      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark
        )
      ).toBe(expectedFee);
    });

    // task #3
    // TODO: implement more test cases for the calculateParkingFee method
  });
});
