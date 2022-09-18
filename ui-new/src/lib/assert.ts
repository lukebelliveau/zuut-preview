export function assertDefined<T>(value: T | undefined | null): T {
  if (!value) throw new Error('Expected a defined value');

  return value;
}