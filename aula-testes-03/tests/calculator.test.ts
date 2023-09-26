import calculator from "calculator";

describe("Math functions", () => {
  it("returns 15 for 12 and 3 params", () => {
    const sum = calculator.sum(12, 3);
    expect(sum).toEqual(15);
  });

  it("returns 9 for 12 and 3 params", () => {
    const sub = calculator.sub(12, 3);
    expect(sub).toEqual(9);
  });

  it("returns 36 for 12 and 3 params", () => {
    const mul = calculator.mul(12, 3);
    expect(mul).toEqual(36);
  });

  it("returns 4 for 12 and 3 params", () => {
    const div = calculator.div(12, 3);
    expect(div).toEqual(4);
  });
});