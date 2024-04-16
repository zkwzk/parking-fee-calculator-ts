import { ChronoUnit, LocalDate, LocalTime } from "@js-joda/core";
import { BaseFee } from "./BaseFee";

export class FixedFeePerXMinutes extends BaseFee {
    feePerXMinutes: number;
    x: number;
    constructor(startTime: string, endTime: string, x: number, feePerXMinutes: number) {
        super(startTime, endTime);
        this.feePerXMinutes = feePerXMinutes;
        this.x = x;
    }

    calculateCost = (fit: { isFit: boolean; startTime?: LocalTime; endTime?: LocalTime; }): number => {
        if(!fit.isFit) return 0;
        const timeDiff = fit.startTime!.until(fit.endTime!, ChronoUnit.MINUTES);
        const chargeNumberOfXMintues = Math.ceil(timeDiff / this.x);
        return parseFloat((chargeNumberOfXMintues * this.feePerXMinutes).toFixed(2));
    }
}