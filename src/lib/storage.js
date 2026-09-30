export function readPreference(key, fallback) {
  try {
    const value = localStorage.getItem(`realm:${key}`);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}
export function writePreference(key, value) {
  try {
    localStorage.setItem(`realm:${key}`, JSON.stringify(value));
  } catch {
    /* Preferences remain usable in memory. */
  }
}
