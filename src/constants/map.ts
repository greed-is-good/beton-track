const DEFAULT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_TILE_SUBDOMAINS = ['a', 'b', 'c'];

function parseZoom(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number.parseInt(value, 10);

  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function parseSubdomains(value: string | undefined): string[] {
  if (!value) {
    return DEFAULT_TILE_SUBDOMAINS;
  }

  const parsedValue = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return parsedValue.length > 0 ? parsedValue : DEFAULT_TILE_SUBDOMAINS;
}

export const MAP_TILE_URL = import.meta.env.VITE_MAP_TILE_URL ?? DEFAULT_TILE_URL;

export const MAP_TILE_ATTRIBUTION =
  import.meta.env.VITE_MAP_TILE_ATTRIBUTION ?? DEFAULT_TILE_ATTRIBUTION;

export const MAP_TILE_SUBDOMAINS = parseSubdomains(import.meta.env.VITE_MAP_TILE_SUBDOMAINS);
export const MAP_DEFAULT_ZOOM = parseZoom(import.meta.env.VITE_MAP_DEFAULT_ZOOM, 12);
export const MAP_FALLBACK_ZOOM = parseZoom(import.meta.env.VITE_MAP_FALLBACK_ZOOM, 14);
export const MAP_MAX_ZOOM = parseZoom(import.meta.env.VITE_MAP_MAX_ZOOM, 19);
