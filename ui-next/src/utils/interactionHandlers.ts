import {
  selectMany,
  unselectAll,
} from '../redux/features/interactions/interactionsSlice';
import {
  redoItemAction,
  removeItems,
  undoItemAction,
} from '../redux/features/items/itemsSlice';
import { AppStore } from '../redux/store';

export const handleDeleteOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  const selectedItemIds = store.getState().interactions.selected;

  if ((e.key === 'Backspace' || e.key === 'Delete') && selectedItemIds) {
    store.dispatch(removeItems(selectedItemIds));
    store.dispatch(unselectAll());
    e.preventDefault();
  }
};

const undoPressed = (e: React.KeyboardEvent<HTMLSpanElement>) => {
  if (e.ctrlKey && e.key === 'z' && getOS() === 'windows') return true;
  if (e.metaKey && e.key === 'z') return true;
  return false;
};

const redoPressed = (e: React.KeyboardEvent<HTMLSpanElement>) => {
  return (
    (e.metaKey && e.shiftKey && e.key === 'z') ||
    (e.ctrlKey && e.key === 'y' && getOS() === 'windows')
  );
};

export const handleUndoRedoOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  if (redoPressed(e)) {
    store.dispatch(redoItemAction());
    e.preventDefault();
  } else if (undoPressed(e)) {
    store.dispatch(undoItemAction());
    e.preventDefault();
  }
};

export const handleSelectAllOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  if (e.key === 'a' && e.metaKey) {
    const allItemIds = store.getState().items.present.ids;
    store.dispatch(selectMany(allItemIds.map((id) => id.toString())));
    e.preventDefault();
  }
};

export const handleEscOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  if (e.key === 'Escape') {
    store.dispatch(unselectAll());
    e.preventDefault();
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
