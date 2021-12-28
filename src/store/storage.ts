import { data } from '.';
import { MIN_COUNT, MAX_COUNT, MIN_YEAR, MAX_YEAR } from '../constants';
import { Settings } from '../interfaces';
import { Data, TQuery } from '../types';

export function initialStorage(reset?: boolean): void {
  const filters: TQuery = {
    name: '',
    count: [MIN_COUNT, MAX_COUNT],
    year: [MIN_YEAR, MAX_YEAR],
    shape: [],
    color: [],
    size: [],
    favorite: false,
  };
  const bookmarks: Data[] = [];
  const sort = '0';
  if (!localStorage.getItem('filters') || reset) {
    localStorage.setItem('filters', JSON.stringify(filters));
  }
  if (!localStorage.getItem('bookmarks')) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  if (!localStorage.getItem('sort')) {
    localStorage.setItem('sort', JSON.stringify(sort));
  }
}

export function initialSettings(reset?: boolean) {
  const settings: Settings = {
    background: 1,
    tree: 1,
    isMusic: false,
    isSnow: false,
  };
  if (!localStorage.getItem('settings') || reset) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}

export function setStorage(filters: TQuery): void {
  localStorage.setItem('filters', JSON.stringify(filters));
}

export function getStorage() {
  const storage = localStorage.getItem('filters');
  if (typeof storage === 'string') {
    return JSON.parse(storage);
  }
}

export function addBookmark(toyNumber: string): void {
  const bookmarksCurrent = localStorage.getItem('bookmarks');
  const cardsData = data;

  if (typeof bookmarksCurrent === 'string') {
    cardsData.forEach((card) => {
      if (card.num === toyNumber) {
        localStorage.setItem('bookmarks', JSON.stringify([...JSON.parse(bookmarksCurrent), card]));
      }
    });
  }
}

export function removeBookmark(toyNumber: string): void {
  const bookmarksCurrent = localStorage.getItem('bookmarks')!;
  const bookmarksNew: Data[] = JSON.parse(bookmarksCurrent).filter(
    (card: Data) => card.num !== toyNumber
  );
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksNew));
}

export function getBookmarks() {
  const bookmarks = localStorage.getItem('bookmarks');
  if (typeof bookmarks === 'string') {
    return JSON.parse(bookmarks);
  }
}

export function resetStorage(): void {
  const select = document.querySelector('.sort__selection')! as HTMLInputElement;
  select.value = '0';
  localStorage.removeItem('bookmarks');
  localStorage.removeItem('sort');
  initialStorage(true);
}

export function setSort(sort: string): void {
  localStorage.setItem('sort', JSON.stringify(sort));
}

export function getSort() {
  const sort = localStorage.getItem('sort');
  if (typeof sort === 'string') {
    return JSON.parse(sort);
  }
}

export function setSettings(settings: Settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export function getSettings() {
  const settings = localStorage.getItem('settings');
  if (typeof settings === 'string') {
    return JSON.parse(settings);
  }
}

export function resetSettings(reset: boolean) {
  initialSettings(reset);
}
