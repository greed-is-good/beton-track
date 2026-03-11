/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_TILE_URL?: string;
  readonly VITE_MAP_TILE_ATTRIBUTION?: string;
  readonly VITE_MAP_TILE_SUBDOMAINS?: string;
  readonly VITE_MAP_DEFAULT_ZOOM?: string;
  readonly VITE_MAP_FALLBACK_ZOOM?: string;
  readonly VITE_MAP_MAX_ZOOM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
