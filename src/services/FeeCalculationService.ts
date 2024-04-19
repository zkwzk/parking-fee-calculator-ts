import { LocalDateTime } from "@js-joda/core";
import { FeeCalculator } from "./fee/FeeCalculator";
import { CarPark, VEHICLE_TYPE } from "../types";
import { carParkList } from "../config";

class FeeCalculationService {
  feeCalculator: FeeCalculator;
  carparkList: CarPark[];

  constructor(carparkList: CarPark[]) {
    this.feeCalculator = new FeeCalculator();
    this.carparkList = carparkList;
  }

  getParkingFeeByCarpark(
    startDateTime: string,
    endDateTime: string,
    vehicle: VEHICLE_TYPE
  ): {[key: string]: number} {
    const carparkFeeMap = new Map<string, number>();
    carParkList.forEach((carpark) => {
      const carparkName = carpark.name;
      const fee = this.feeCalculator.calculateParkingFee(
        startDateTime,
        endDateTime,
        carpark,
        vehicle
      );
      carparkFeeMap.set(carparkName, fee);
    });

    return Object.fromEntries(carparkFeeMap.entries());carparkFeeMap;
  }
}

export const feeCalculationService = new FeeCalculationService(carParkList);
