import { ActionCreators } from 'redux-undo';
import { unselect } from '../features/interactions/interactionsSlice';
import { removeItem } from '../features/items/itemsSlice';
import { AppStore } from './store';

export const handleDeleteOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  const selectedItemId = store.getState().interactions.selected;

  if ((e.key === 'Backspace' || e.key === 'Delete') && selectedItemId) {
    store.dispatch(removeItem(selectedItemId));
    store.dispatch(unselect());
  }
};

export const handleUndoRedoOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  if (
    (e.metaKey && e.shiftKey && e.key === 'z') ||
    (e.metaKey && e.key === 'y' && getOS() === 'windows')
  ) {
    store.dispatch(ActionCreators.redo());
  } else if (e.metaKey && e.key === 'z') {
    store.dispatch(ActionCreators.undo());
  }
};

const getOS = () => {
  let userAgent = window.navigator.userAgent.toLowerCase(),
    macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
    windowsPlatforms = /(win32|win64|windows|wince)/i,
    iosPlatforms = /(iphone|ipad|ipod)/i,
    os = null;

  if (macosPlatforms.test(userAgent)) {
    os = 'macos';
  } else if (iosPlatforms.test(userAgent)) {
    os = 'ios';
  } else if (windowsPlatforms.test(userAgent)) {
    os = 'windows';
  } else if (/android/.test(userAgent)) {
    os = 'android';
  } else if (!os && /linux/.test(userAgent)) {
    os = 'linux';
  }

  return os;
};
