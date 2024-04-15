import { FitResult } from "../../../types";
import { parseTimeString } from "../../../utils";
import { FixedFeePerEntry } from "../FixedFeePerEntry";
describe('FixedFeePerEntry', () => {
    const configStartTime = '10:00';
    const configEndTime = '12:00';
    const feeRate = 5;
    const mockFitResult: FitResult = {
        startTime: parseTimeString(configStartTime),
        endTime: parseTimeString(configEndTime),
        isFit: true
    }
    const fixedFeePerEntry = new FixedFeePerEntry(configStartTime, configEndTime, feeRate);

    describe('calculateCost', () => {
        it('should return 5 for a if its within the configed time period', () => {
            expect(fixedFeePerEntry.calculateCost(mockFitResult)).toBe(feeRate);
        });

        it('should return 0 if not fit', () => {
            expect(fixedFeePerEntry.calculateCost({ ...mockFitResult, isFit: false })).toBe(0);
        })
    });
});
