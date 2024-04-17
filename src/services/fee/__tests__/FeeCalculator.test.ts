import { LocalDate, LocalDateTime, LocalTime } from "@js-joda/core";
import { FeeCalculator } from "../FeeCalculator";
import { HeerenCarPark, plazaSingapuraCarPark } from "../../../config";
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
    it("should return 0 if within grace period", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-01T10:10";
      const expectedFee = 0;

      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark
        )
      ).toBe(expectedFee);
    });

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

    it("should calculate the parking fee correctly for a 2-hour duration", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-01T12:00";
      const expectedFee = 4.15;
      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark
        )
      ).toBe(expectedFee);
    });

    it("should calculate the parking fee correctly for parking across 1 weekday and 1 weekend-day", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-02T11:00";

      /*
        10-1100: 1.95
        1100-17:59: 7*4*0.55 = 15.40
        18-23:59: 3.25

        12-0259: 3*4*0.55 = 6.60
        3-500: 3.25
        501-1100: 6*4*0.55 = 13.2

        total: 1.95 + 15.40 + 3.25 + 6.60 + 3.25 + 13.2 = 43.65
        */
      const expectedFee = 43.65;
      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark
        )
      ).toBe(expectedFee);
    });

    /*
    10-1100: 1.95
        1100-17:59: 7*4*0.55 = 15.40
        18-23:59: 3.25

        12-0259: 3*4*0.55 = 6.60
        3-500: 3.25
        501-1759: 13*4*0.55 = 28.6
        18-23:59: 3.25

        12-0259: 3*4*0.55 = 6.60
        3-500: 3.25
        501-1200: 7*4*0.55 = 15.40

        total: 1.95 + 15.40 + 3.25 + 6.60 + 3.25 + 28.6 + 3.25 + 6.60 + 3.25 + 15.40 = 87.55
    */
    it("should calculate the parking fee correctly for parking across 1 weekday and 2 weekend-days", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-03T12:00";
      const expectedFee = 87.55;
      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark
        )
      ).toBe(expectedFee);
    });

    it("should calculate the parking fee correctly for a 2-hour duration for vehicle type = MOTORCYCLE", () => {
      const startTime = "2021-01-01T10:00";
      const endTime = "2021-01-01T12:00";
      const expectedFee = 1.3;
      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark,
          VEHICLE_TYPE.MOTORCYCLE
        )
      ).toBe(expectedFee);
    });

    it("should calculate the parking fee correctly for a car parking from 1800-2359", () => {
      const startTime = "2021-01-01T18:00";
      const endTime = "2021-01-01T23:59";
      const expectedFee = 3.25;
      expect(
        feeCalculator.calculateParkingFee(
          startTime,
          endTime,
          plazaSingapuraCarPark
        )
      ).toBe(expectedFee);
    });
  });

  it("should calculate the parking fee correctly for a car parking from 1800-0000", () => {
    const startTime = "2021-01-01T18:00";
    const endTime = "2021-01-02T00:00";
    const expectedFee = 3.8;
    expect(
      feeCalculator.calculateParkingFee(
        startTime,
        endTime,
        plazaSingapuraCarPark
      )
    ).toBe(expectedFee);
  });

  it('should calculate the parking fee correctly for a car parking in weekday from 0000-1800', () => {
    // 0000-0100: 1.95
    // 0101-1759: 17*4*0.55 = 37.4
    // 1800-1800: 3.25
    // total: 1.95 + 37.4 + 3.25 = 42.6

    const startTime = "2021-01-01T00:00";
    const endTime = "2021-01-01T18:00";
    const expectedFee = 42.6;
    expect(feeCalculator.calculateParkingFee(startTime, endTime, plazaSingapuraCarPark)).toBe(expectedFee);
  });

  it('should return correct fixed entry fee for heeren carpark', () => {
    const startTime = "2020-12-31T18:00";
    const endTime = "2021-01-01T02:59";
    const expectedFee = 4.5;
    expect(feeCalculator.calculateParkingFee(startTime, endTime, HeerenCarPark)).toBe(expectedFee);
  });

  /*
  show instance where copilot generates the wrong implementation
  */
});
