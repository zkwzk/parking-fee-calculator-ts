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
  
    isFit = (startTime: string, endTime: string) : FitResult => {
      const parsedStartTime = parseTimeString(startTime);
      const parsedEndTime = parseTimeString(endTime);
      if((parsedStartTime.isBefore(this.startTime) && parsedEndTime.isBefore(this.startTime)) || (parsedEndTime.isAfter(this.endTime) && parsedStartTime.isAfter(this.endTime))) {
          return { isFit: false }
      }
  
      return {
          isFit: true,
          startTime: parsedStartTime.isAfter(this.startTime)? parsedStartTime : this.startTime,
          endTime: parsedEndTime.isBefore(this.endTime)? parsedEndTime: this.endTime
        }
    }
  
    calculateCost = (fit: FitResult): number => {
      throw new Error("Method not implemented.");
    }
  }
  