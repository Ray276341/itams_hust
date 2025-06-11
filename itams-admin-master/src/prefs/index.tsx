export enum Prefs {
  DENSE = 'dense',
  ROWS_PER_PAGE = 'rowsPerPage',
}

export function getPref<T>(name: string) {
  return window.localStorage.getItem(name) as T;
}

export function setPref<T>(name: string, value: T) {
  return Number(window.localStorage.setItem(name, String(value)));
}
