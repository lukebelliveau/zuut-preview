import {
  selectMany,
  unselectAll,
} from '../features/interactions/interactionsSlice';
import {
  redoItemAction,
  removeItems,
  undoItemAction,
} from '../features/items/itemsSlice';
import { AppStore } from './store';

export const handleDeleteOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  const selectedItemIds = store.getState().interactions.selected;

  if ((e.key === 'Backspace' || e.key === 'Delete') && selectedItemIds) {
    store.dispatch(removeItems(selectedItemIds));
    store.dispatch(unselectAll());
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
    store.dispatch(redoItemAction());
  } else if (e.metaKey && e.key === 'z') {
    store.dispatch(undoItemAction());
  }
};

export const handleSelectAllOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  if (e.key === 'a' && e.metaKey) {
    const allItemIds = store.getState().items.present.ids;
    store.dispatch(selectMany(allItemIds.map((id) => id.toString())));
  }
};

export const handleEscOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  if (e.key === 'Escape') {
    store.dispatch(unselectAll());
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
