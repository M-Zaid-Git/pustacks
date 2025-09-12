export function toDirectDownload(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    // Handle file/d/<id>/view style
    const match = u.pathname.match(/\/d\/([\w-]+)/);
    if (match && match[1]) {
      const id = match[1];
      return `https://drive.google.com/uc?export=download&id=${id}`;
    }
    // Handle open?id=<id>
    const id = u.searchParams.get('id');
    if (id) {
      return `https://drive.google.com/uc?export=download&id=${id}`;
    }
    // Folders or unknown formats: return original
    return url;
  } catch {
    return url;
  }
}
