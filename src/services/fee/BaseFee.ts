import { Fee, FitResult } from "../../types";
import { parseTimeString } from "../../utils";

export class BaseFee implements Fee {
    startTime: Date;
    endTime: Date;
    constructor(startTime: string, endTime: string) {
      this.startTime = parseTimeString(startTime);
      this.endTime = parseTimeString(endTime);
    }
  
    isFit = (startTime: string, endTime: string) : FitResult => {
      const parsedStartTime = parseTimeString(startTime);
      const parsedEndTime = parseTimeString(endTime);
      if((parsedStartTime < this.startTime && parsedEndTime < this.startTime) || (parsedEndTime > this.endTime && parsedStartTime > this.endTime)) {
          return { isFit: false }
      }
  
      return {
          isFit: true,
          startTime: parsedStartTime >= this.startTime? parsedStartTime : this.startTime,
          endTime: parsedEndTime <= this.endTime? parsedEndTime: this.endTime
        }
    }
  
    calculateCost = (fit: FitResult): number => {
      return 0;
    }
  }
  