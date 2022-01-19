import Playground from '../playground';
import { PlaygroundAdapter } from './playgroundAdapter';
import PlaygroundReduxAdapter from './playgroundReduxAdapter';

export default class PlaygroundRepository {
  adapter: PlaygroundAdapter;

  public static forRedux() {
    const adapter = new PlaygroundReduxAdapter();
    return new PlaygroundRepository(adapter);
  }

  constructor(adapter: PlaygroundAdapter) {
    this.adapter = adapter;
  }

  select(): Playground {
    return this.adapter.select();
  }

  update(playground: Playground) {
    this.adapter.update(playground);
  }

  resize(playground: Playground) {
    this.adapter.resize(playground);
  }
}