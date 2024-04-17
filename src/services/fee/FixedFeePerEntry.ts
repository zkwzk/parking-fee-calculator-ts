import { LocalTime } from "@js-joda/core";
import { CalculationResult, FitResult, PreviousDayContext } from "../../types";
import { parseTimeString } from "../../utils";
import { BaseFee } from "./BaseFee";

export class FixedFeePerEntry extends BaseFee {
    feePerEntry: number;
    constructor(startTime: string, endTime: string, feePerEntry: number, isAcrossDay = false) {
      super(startTime, endTime, isAcrossDay);
      this.startTime = parseTimeString(startTime);
      this.endTime = parseTimeString(endTime);
      this.feePerEntry = feePerEntry;
    }
  
    calculateCost = (fit: FitResult, previousDayContext?: PreviousDayContext) : CalculationResult => {
      if(fit.isFit) {
        if(this.isAcrossDay && previousDayContext && previousDayContext.isFirstXCharged) {
            return { cost: 0 }
         }

         if(!this.isAcrossDay) {
            return { cost: this.feePerEntry };
         }
        return { cost: this.feePerEntry, previousDayContext: { isFirstXCharged: true } };
      }

      return  { cost: 0 };;
    }
  }