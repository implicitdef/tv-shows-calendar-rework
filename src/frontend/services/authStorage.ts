const ls = window.localStorage;

const key = "auth:googleToken";

export function store(googleToken: string): void {
  ls.setItem(key, googleToken);
}

export function clear(): void {
  ls.removeItem(key);
}

export function get(): string | null {
  return ls.getItem(key);
}
