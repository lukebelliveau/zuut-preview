export const closeTo = (expected: number, precision = 10) => ({
  asymmetricMatch: (actual: number) =>
    Math.abs(expected - actual) < Math.pow(10, -precision) / 2,
});
