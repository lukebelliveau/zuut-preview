import { Maybe } from "./graphql";

export function unwrapOrUndefined<T>(value: Maybe<T>): T | undefined {
  if (value === undefined) {
    return undefined;
  } else {
    return value as T;
  }
}