import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { FixedFeePerEntry } from '../services/fee/FixedFeePerEntry';
import { parseTimeString } from '../utils';

export interface Request extends ExpressRequest {
  // Add any custom request properties here
}

export interface Response extends ExpressResponse {
  // Add any custom response properties here
}


export type FeeRule<T extends FixedFeePerEntry
//  | FixedFirstXMinutes | FixedFeePerXMinutes
 > = {
  startTime: string;
  endTime: string;
  fee: T;
}


export type FitResult = {
  isFit: boolean;
  startTime?: Date;
  endTime?: Date;
}

export interface Fee { 
  startTime: Date; 
  endTime: Date;
  isFit: (startTime: string, endTime: string) => FitResult;
  calculateCost: (fit: FitResult) => number;
}

export type FixedFirstXMinutes = {
  x: number;
  feeFirstXMintues: number;
  y: number;
  subsequenceChargePerYMinutes: number;
}

export type FixedFeePerXMinutes = {
  feePerXMinutes: number; 
  x: number;
}

export type CarFee = {
  weekdayFeeRules: Fee[];
  weekendPHFeeRules: Fee[];
}

export type MotocycleFee = {
  feeRules: Fee[];
}