import { LocalTime } from "@js-joda/core";
import { Fee, FitResult } from "../../types";
import { parseTimeString } from "../../utils";

export class BaseFee implements Fee {
  startTime: LocalTime;
  endTime: LocalTime;
  constructor(startTime: string, endTime: string) {
    this.startTime = parseTimeString(startTime);
    this.endTime = parseTimeString(endTime);
  }

  isFit = (startTime: LocalTime, endTime: LocalTime): FitResult => {
    // task #2
    // TODO: Implement the isFit method
    return { isFit: false };
  };

  calculateCost = (fit: FitResult): number => {
    throw new Error("Method not implemented.");
  };
}
