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
    describe('isFit', () => {
        it('should return true if the given start and end times are within the configured range', () => {
            const startTime = '10:30';
            const endTime = '11:30';
            const fitResult = fixedFeePerEntry.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(true);
            expect(fitResult.startTime).toStrictEqual(parseTimeString(startTime));
            expect(fitResult.endTime).toStrictEqual(parseTimeString(endTime));
        });

        it('should return false if the given start and end times are outside the configured range', () => {
            const startTime = '09:00';
            const endTime = '09:59';
            const fitResult = fixedFeePerEntry.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(false);
        });

        it('should return configEndTime if stay longer than the configured end time', () => {
            const startTime = '11:30';
            const endTime = '13:00';
            const fitResult = fixedFeePerEntry.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(true);
            expect(fitResult.startTime).toStrictEqual(parseTimeString(startTime));
            expect(fitResult.endTime).toStrictEqual(parseTimeString(configEndTime));
        });
    });

    // describe('calculateCost', () => {
    //     it('should calculate the cost correctly for a fit result', () => {
    //         const fitResult = {
    //             startTime: '10:30',
    //             endTime: '11:30',
    //             isFit: true
    //         };
    //         const cost = fixedFeePerEntry.calculateCost(fitResult);
    //         expect(cost).toBe(feeRate);
    //     });

    //     it('should return 0 for a not fit result', () => {
    //         const notFitResult = {
    //             startTime: '09:00',
    //             endTime: '10:00',
    //             isFit: false
    //         };
    //         const cost = fixedFeePerEntry.calculateCost(notFitResult);
    //         expect(cost).toBe(0);
    //     });
    // });
});
