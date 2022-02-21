import { Maybe } from '../graphql';

export function unwrapOrUndefined<T>(value: Maybe<T>): T | undefined {
  if (value === undefined) {
    return undefined;
  } else {
    return value as T;
  }
}

export function unwrapOrError<T>(value: Maybe<T>): T {
  if (value === undefined) {
    throw new Error('Attempted to unwrap undefined value');
  } else {
    return value as T;
  }
}