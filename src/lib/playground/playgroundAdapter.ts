import Playground from '../playground';

export interface PlaygroundAdapter {
  select(): Playground;
  update(item: Playground): void;
  resize(item: Playground): void;
}