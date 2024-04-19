import { LocalDate, LocalDateTime, LocalTime } from "@js-joda/core";
import { VEHICLE_TYPE } from "../../types";
import { feeCalculationService } from "../FeeCalculationService";

describe("feeCalculationService", () => {
  // const startDateTime = LocalDateTime.of(
  //   LocalDate.of(2024, 4, 17),
  //   LocalTime.parse("12:00")
  // );
  // const endDateTime = LocalDateTime.of(
  //   LocalDate.of(2024, 4, 17),
  //   LocalTime.parse("19:00")
  // );

  const startDateTime = "2024-04-17T12:00";
  const endDateTime = "2024-04-17T19:00";

  /* 
    expected fee for plaza singapura: $1.95 + ($0.55*4*5) + $3.25 = $16.2
    expected fee for orchard central: $2.73 + ($0.68*4*5) + $4.09 = $20.42
    expected fee for takashimaya: ($1.85*4) + ($1.31*6) + ($1.85*4) = $7.4 + $7.86 + $7.4 + 4.36 = $27.02
  */
  it("should return map of carpark name to parking fee given intended parking start and end datetime and vehicle type", () => {
    const expectedCarparkMapOutput = new Map<string, number>();
    expectedCarparkMapOutput.set("Plaza Singapura", 16.2);
    expectedCarparkMapOutput.set("Orchard Central", 20.42);
    expectedCarparkMapOutput.set("Takashimaya Shopping Centre", 27.02);
    expect(
      feeCalculationService.getParkingFeeByCarpark(
        startDateTime,
        endDateTime,
        VEHICLE_TYPE.CAR
      )
    ).toStrictEqual(expectedCarparkMapOutput);
  });
});
