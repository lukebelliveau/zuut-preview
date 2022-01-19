import { Adapter } from '../adapter';
import Playground from '../playground';
import PlaygroundReduxAdapter from './playgroundReduxAdapter';

export default class PlaygroundRepository {
  adapter: Adapter<Playground>;

  public static forRedux() {
    const adapter = new PlaygroundReduxAdapter();
    return new PlaygroundRepository(adapter);
  }

  constructor(adapter: Adapter<Playground>) {
    this.adapter = adapter;
  }

  select(): Playground {
    return this.adapter.select();
  }

  update(playground: Playground) {
    this.adapter.update(playground);
  }
}