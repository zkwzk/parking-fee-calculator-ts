import { FixedFeePerEntry } from "./services/fee/FixedFeePerEntry";
import { FixedFeePerXMinutes } from "./services/fee/FixedFeePerXMinutes";
import { FixedFirstXMinutes } from "./services/fee/FixedFirstXMinutes";
import { CarPark } from "./types";

const orchardCentralWeekday0to1759: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "17:59", 60, 2.73, 15, 0.68);
const orchardCentralWeekday18to2359: FixedFeePerEntry = new FixedFeePerEntry("18:00", "23:59", 4.09);

const orchardCentralWeekendPH0to1759: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "17:59", 60, 2.94, 15, 0.74);
const orchardCentralWeekendPH18to2359: FixedFeePerEntry = new FixedFeePerEntry("18:00", "23:59", 4.41);

const scape0to0600: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "06:00", 60, 2.29, 30, 1.40);
const scape0601to1800: FixedFirstXMinutes = new FixedFirstXMinutes("06:01", "18:00", 60, 1.99, 30, 1.40);
const scape1801to2359: FixedFirstXMinutes = new FixedFirstXMinutes("18:01", "23:59", 60, 2.29, 30, 1.40);

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

  const heerenWeekday3to1659: FixedFirstXMinutes = new FixedFirstXMinutes("03:00", "16:59", 60, 4, 30, 2);
  const heerenWeekday17to2359: FixedFeePerEntry  = new FixedFeePerEntry("17:00", "23:59", 4.5, true);
  const heerenWeekday0to259: FixedFeePerEntry  = new FixedFeePerEntry("00:00", "02:59", 4.5, true);
  const heerenWeekendPH0to2359: FixedFirstXMinutes = new FixedFirstXMinutes("00:00", "23:59", 120, 6, 30, 2);


export const HeerenCarPark: CarPark = {
    name: "Heeren",
    gracePeriodInMinutes: 10,
    carFee: {
      weekdayFeeRules: [
        heerenWeekday0to259,
        heerenWeekday3to1659,
        heerenWeekday17to2359
      ],
      weekendPHFeeRules: [
        heerenWeekendPH0to2359,
      ],
    },
    motocycleFee: {
      feeRules: [],
    },
  };
