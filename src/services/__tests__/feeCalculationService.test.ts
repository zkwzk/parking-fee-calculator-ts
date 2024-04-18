import { feeCalculationService } from "../feeCalculationService";

describe("helloService", () => {
  it("should return hello world", () => {
    expect(feeCalculationService.sayHello()).toBe("Hello, world!");
  });
});
