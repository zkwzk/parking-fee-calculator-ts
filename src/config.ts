import { FixedFeePerEntry } from "./services/fee/FixedFeePerEntry";
import { FixedFeePerXMinutes } from "./services/fee/FixedFeePerXMinutes";
import { FixedFirstXMinutes } from "./services/fee/FixedFirstXMinutes";
import { CarPark } from "./types";

const plazaSingapuraCarWeekday0to1759: FixedFirstXMinutes =
  new FixedFirstXMinutes("00:00", "17:59", 60, 1.95, 15, 0.55);
const plazaSingapuraCarWeekday18to2359: FixedFeePerEntry = new FixedFeePerEntry(
  "18:00",
  "23:59",
  3.25
);

const plazaSingapuraCarWeekendPH0to0259: FixedFeePerXMinutes =
  new FixedFeePerXMinutes("00:00", "02:59", 15, 0.55);
const plazaSingapuraCarWeekendPH03to1759: FixedFirstXMinutes =
  new FixedFirstXMinutes("03:00", "17:59", 120, 3.25, 15, 0.55);
const plazaSingapuraCarWeekend18to2359: FixedFeePerEntry = new FixedFeePerEntry(
  "18:00",
  "23:59",
  3.25
);

const plazaSingapuraMotorcyclePerEntry: FixedFeePerEntry = new FixedFeePerEntry(
  "00:00",
  "23:59",
  1.3
);

export const plazaSingapuraCarPark: CarPark = {
  name: "Plaza Singapura",
  gracePeriodInMinutes: 15,
  carFee: {
    weekdayFeeRules: [
      plazaSingapuraCarWeekday0to1759,
      plazaSingapuraCarWeekday18to2359,
    ],
    weekendPHFeeRules: [
      plazaSingapuraCarWeekendPH0to0259,
      plazaSingapuraCarWeekendPH03to1759,
      plazaSingapuraCarWeekend18to2359,
    ],
  },
  motocycleFee: {
    feeRules: [plazaSingapuraMotorcyclePerEntry],
  },
};

const orchardCentralWeekday0to1759: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "17:59", 60, 2.73, 15, 0.68);
const orchardCentralWeekday18to2359: FixedFeePerEntry = new FixedFeePerEntry("18:00", "23:59", 4.09);

const orchardCentralWeekendPH0to1759: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "17:59", 60, 2.94, 15, 0.74);
const orchardCentralWeekendPH18to2359: FixedFeePerEntry = new FixedFeePerEntry("18:00", "23:59", 4.41);

export const orchardCentralCarPark: CarPark = {
    name: "Orchard Central",
    gracePeriodInMinutes: 10,
    carFee: {
      weekdayFeeRules: [
        orchardCentralWeekday0to1759,
        orchardCentralWeekday18to2359,
      ],
      weekendPHFeeRules: [
        orchardCentralWeekendPH0to1759,
        orchardCentralWeekendPH18to2359,
      ],
    },
    motocycleFee: {
      feeRules: [],
    },
  };

  const tscWeekday0to1159: FixedFeePerXMinutes = new FixedFeePerXMinutes("00:00", "11:59", 30, 1.31);
  const tscWeekday12to1359: FixedFeePerXMinutes = new FixedFeePerXMinutes("12:00", "13:59", 30, 1.85);
  const tscWeekday14to1659: FixedFeePerXMinutes = new FixedFeePerXMinutes("14:00", "16:59", 30, 1.31);
  const tscWeekday17to1859: FixedFeePerXMinutes = new FixedFeePerXMinutes("17:00", "18:59", 30, 1.85);
  const tscWeekday19to2359: FixedFeePerEntry = new FixedFeePerEntry("19:00", "23:59", 4.36);

  const tscWeekendPH0to1159: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "11:59", 60, 2.62, 30, 1.64);
  const tscWeekendPH12to1359: FixedFirstXMinutes = new FixedFirstXMinutes("12:00", "13:59", 60, 3.71, 30, 2.18);
  const tscWeekendPH14to1659: FixedFirstXMinutes = new FixedFirstXMinutes("14:00", "16:59", 60, 2.62, 30, 1.64);
  const tscWeekendPH17to1859: FixedFirstXMinutes = new FixedFirstXMinutes("17:00", "18:59", 60, 3.71, 30, 2.18);
  const tscWeekendPH19to2359: FixedFeePerEntry = new FixedFeePerEntry("19:00", "23:59", 4.36);

  export const tscCarPark: CarPark = {
    name: "Takashimaya Shopping Centre",
    gracePeriodInMinutes: 10,
    carFee: {
      weekdayFeeRules: [
        tscWeekday0to1159,
        tscWeekday12to1359,
        tscWeekday14to1659,
        tscWeekday17to1859,
        tscWeekday19to2359,
      ],
      weekendPHFeeRules: [
        tscWeekendPH0to1159,
        tscWeekendPH12to1359,
        tscWeekendPH14to1659,
        tscWeekendPH17to1859,
        tscWeekendPH19to2359,
      ],
    },
    motocycleFee: {
      feeRules: [],
    },
  };
