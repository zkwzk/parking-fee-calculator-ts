import { FitResult } from "../../../types";
import { parseTimeString } from "../../../utils";
import { BaseFee } from "../BaseFee";

describe('BaseFee', () => {
    const configStartTime = '10:00';
    const configEndTime = '12:00';
    const feeRate = 5;
    const mockFitResult: FitResult = {
        startTime: parseTimeString(configStartTime),
        endTime: parseTimeString(configEndTime),
        isFit: true
    }
    const baseFee = new BaseFee(configStartTime, configEndTime);
    describe('isFit', () => {
        it('should return true if the given start and end times are within the configured range', () => {
            const startTime = '10:30';
            const endTime = '11:30';
            const fitResult = baseFee.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(true);
            expect(fitResult.startTime).toStrictEqual(parseTimeString(startTime));
            expect(fitResult.endTime).toStrictEqual(parseTimeString(endTime));
        });

        it('should return false if the given start and end times are outside the configured range', () => {
            const startTime = '09:00';
            const endTime = '09:59';
            const fitResult = baseFee.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(false);
        });

        it('should return configEndTime if stay longer than the configured end time', () => {
            const startTime = '11:30';
            const endTime = '13:00';
            const fitResult = baseFee.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(true);
            expect(fitResult.startTime!.equals(parseTimeString(startTime))).toBeTruthy;
            expect(fitResult.endTime!.equals(parseTimeString(configEndTime))).toBeTruthy;
        });
        
        it('should return configedStartTime if entry earlier than the configured start time', () => {
            const startTime = '09:30';
            const endTime = '10:30';
            const fitResult = baseFee.isFit(startTime, endTime);
            expect(fitResult.isFit).toBe(true);
            expect(fitResult.startTime).toStrictEqual(parseTimeString(configStartTime));
            expect(fitResult.endTime).toStrictEqual(parseTimeString(endTime));
        });
    });

    describe('calculateCost', () => {
        it('should throw an error if not implemented', () => {
            expect(() => baseFee.calculateCost(mockFitResult)).toThrow("Method not implemented.");
        });
    });
});
