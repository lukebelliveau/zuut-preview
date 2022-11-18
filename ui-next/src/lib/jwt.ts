export function loadJwt(): string | null {
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.match(/@@auth0/)) {
      const data = localStorage.getItem(key);
      if (!data) return null;

      return JSON.parse(data).body.id_token;
    }
  }
  return null;
}