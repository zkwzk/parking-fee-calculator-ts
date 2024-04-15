import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { BaseFee } from '../services/fee/BaseFee';
import { LocalTime } from '@js-joda/core';

export interface Request extends ExpressRequest {
  // Add any custom request properties here
}

export interface Response extends ExpressResponse {
  // Add any custom response properties here
}

export type FitResult = {
  isFit: boolean;
  startTime?: LocalTime;
  endTime?: LocalTime;
}

export interface Fee { 
  startTime: LocalTime; 
  endTime: LocalTime;
  isFit: (startTime: string, endTime: string) => FitResult;
  calculateCost: (fit: FitResult) => number;
}

export type CarFee = {
  weekdayFeeRules: BaseFee[];
  weekendPHFeeRules: BaseFee[];
}

export type MotocycleFee = {
  feeRules: BaseFee[];
}

export type CarPark = {
  name: string;
  carFee: CarFee;
  motocycleFee: MotocycleFee;
  gracePeriodInMinutes: number;
}

export type CalculateDaysResult = {
  dayStartTime: LocalTime, 
  dayEndTime: LocalTime, 
  isWeekendOrPH: boolean
}