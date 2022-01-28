import Playground from '../playground';
import { PlaygroundAdapter } from './playgroundAdapter';
import PlaygroundReduxAdapter from './playgroundReduxAdapter';
import PlaygroundReduxSelectorAdapter from './playgroundReduxSelectorAdapter';

export default class PlaygroundRepository {
  adapter: PlaygroundAdapter;

  public static forRedux() {
    const adapter = new PlaygroundReduxAdapter();
    return new PlaygroundRepository(adapter);
  }

  public static forReduxSelector(selector: any) {
    const adapter = new PlaygroundReduxSelectorAdapter(selector);
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

  zoom(playground: Playground) {
    this.adapter.zoom(playground);
  }
}