const KEY = 'pustacks_collection_v1';

function read() {
  try {
    const s = localStorage.getItem(KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function write(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

export function getSavedKeys() {
  return read();
}

export function isSaved(key) {
  return read().includes(key);
}

export function toggleSaved(key) {
  const cur = read();
  const idx = cur.indexOf(key);
  if (idx === -1) {
    cur.push(key);
  } else {
    cur.splice(idx, 1);
  }
  write(cur);
  // fire an event so other components can react
  window.dispatchEvent(new CustomEvent('collection:changed', { detail: { keys: cur } }));
  return cur;
}