import { Maybe } from "graphql/jsutils/Maybe";
import { unwrapOrUndefined } from "./graphqlInput";

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