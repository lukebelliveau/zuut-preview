import { Maybe } from 'graphql/jsutils/Maybe';
import { unwrapOrError, unwrapOrUndefined } from './graphqlData';

describe('#unwrapOrUndefined', () => {
  it('returns undefined for an undefined value', () => {
    const value: Maybe<string> = undefined;
    expect(unwrapOrUndefined(value)).toBeUndefined();
  });
  it('returns a string value', () => {
    const value: Maybe<string> = 'something';
    expect(unwrapOrUndefined(value)).toEqual('something');
  });
});

describe('#unwrapOrError', () => {
  it('returns undefined for an undefined value', () => {
    const value: Maybe<string> = undefined;
    expect(() => unwrapOrError(value)).toThrow();
  });
  it('returns a string value', () => {
    const value: Maybe<string> = 'something';
    expect(unwrapOrError(value)).toEqual('something');
  });
});