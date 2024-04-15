import { LocalTime } from "@js-joda/core";
import { FitResult } from "../../types";
import { parseTimeString } from "../../utils";
import { BaseFee } from "./BaseFee";

export class FixedFeePerEntry extends BaseFee {
    feePerEntry: number;
    constructor(startTime: string, endTime: string, feePerEntry: number) {
      super(startTime, endTime);
      this.startTime = parseTimeString(startTime);
      this.endTime = parseTimeString(endTime);
      this.feePerEntry = feePerEntry;
    }
  
    calculateCost = (fit: FitResult) : number => {
      if(fit.isFit) {
        return this.feePerEntry;
      }

      return 0;
    }
  }