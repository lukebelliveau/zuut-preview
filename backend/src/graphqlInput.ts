import { Maybe } from "./graphql";

export function unwrapOrUndefined<T>(value: Maybe<T>): T | undefined {
  if (value === undefined) {
    return undefined;
  } else {
    return value as T;
  }
}

export function assertDefined<T>(value: T | null | undefined): T {
  if (value === undefined || value === null) {
    throw new Error('Unexpected null value');
  } else {
    return value as T;
  }
}