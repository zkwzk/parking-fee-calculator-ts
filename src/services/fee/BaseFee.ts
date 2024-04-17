import { LocalTime } from "@js-joda/core";
import { CalculationResult, Fee, FitResult, PreviousDayContext } from "../../types";
import { parseTimeString } from "../../utils";

export class BaseFee implements Fee {
  startTime: LocalTime;
  endTime: LocalTime;
  isAcrossDay: boolean;
  constructor(startTime: string, endTime: string, isAcrossDay = false) {
    this.startTime = parseTimeString(startTime);
    this.endTime = parseTimeString(endTime);
    this.isAcrossDay = isAcrossDay;
  }

  isFit = (startTime: LocalTime, endTime: LocalTime): FitResult => {
    if (
      (startTime.isBefore(this.startTime) &&
        endTime.isBefore(this.startTime)) ||
      (endTime.isAfter(this.endTime) && startTime.isAfter(this.endTime))
    ) {
      return { isFit: false };
    }

    return {
      isFit: true,
      startTime: startTime.isAfter(this.startTime) ? startTime : this.startTime,
      endTime: endTime.isBefore(this.endTime) ? endTime : this.endTime,
    };
  };

  calculateCost = (fit: FitResult, previousDayContext?: PreviousDayContext): CalculationResult => {
    throw new Error("Method not implemented.");
  };
}
