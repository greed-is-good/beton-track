import L from 'leaflet';

export const plantMarkerIcon = L.divIcon({
  className: 'leaflet-trip-marker leaflet-trip-marker--plant',
  html: '<span class="leaflet-trip-marker__dot"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export const siteMarkerIcon = L.divIcon({
  className: 'leaflet-trip-marker leaflet-trip-marker--site',
  html: '<span class="leaflet-trip-marker__dot"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function renderTruckArrow(rotation: number): string {
  return `<svg class="leaflet-trip-marker__truck-arrow" viewBox="0 0 24 24" style="transform: translate(-50%, -50%) rotate(${rotation.toFixed(
    1,
  )}deg)" aria-hidden="true"><path d="M12 1L18 12H14V23H10V12H6L12 1Z" /></svg>`;
}

export function createTruckMarkerIcon(rotation: number | null): L.DivIcon {
  return L.divIcon({
    className: 'leaflet-trip-marker leaflet-trip-marker--truck',
    html: `<span class="leaflet-trip-marker__truck-shell">
      <span class="leaflet-trip-marker__truck-pulse"></span>
      <span class="leaflet-trip-marker__truck-core"></span>
      ${rotation === null ? '' : renderTruckArrow(rotation)}
    </span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}
