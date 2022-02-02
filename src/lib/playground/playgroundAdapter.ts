import Playground from '../playground';

export interface PlaygroundAdapter {
  select(): Playground;
  update(playground: Playground): void;
  resize(playground: Playground): void;
  zoom(playground: Playground): void;
}