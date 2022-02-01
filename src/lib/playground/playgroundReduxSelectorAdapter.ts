import { selectPlaygroundState } from '../../features/playgrounds/playgroundSelector';
import Playground from '../playground';
import { PlaygroundAdapter } from './playgroundAdapter';
import PlaygroundReduxAdapter from './playgroundReduxAdapter';

export default class PlaygroundReduxSelectorAdapter implements PlaygroundAdapter {
  selector: any;

  constructor(selector: any) {
    this.selector = selector;
  }

  select(): Playground {
    const state = this.selector(selectPlaygroundState);
    return PlaygroundReduxAdapter.playgroundFromState(state);
  }
  update(): void {
    throw new Error('Method not implemented.');
  }
  resize(): void {
    throw new Error('Method not implemented.');
  }
  zoom(): void {
    throw new Error('Method not implemented.');
  }
  addItem(): void {
    throw new Error('Method not implemented.');
  }
  positionItem(): void {
    throw new Error('Method not implemented.');
  }
}