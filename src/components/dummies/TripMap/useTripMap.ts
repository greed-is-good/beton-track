import { useEffect, useRef, type MutableRefObject } from 'react';
import L from 'leaflet';

import {
  MAP_DEFAULT_ZOOM,
  MAP_FALLBACK_ZOOM,
  MAP_MAX_ZOOM,
  MAP_TILE_ATTRIBUTION,
  MAP_TILE_SUBDOMAINS,
  MAP_TILE_URL,
} from '../../../constants/map';
import type { GeoPoint } from '../../../models/common/client';
import type { Trip } from '../../../models/order/client';
import { createTruckMarkerIcon, plantMarkerIcon, siteMarkerIcon } from './constants';

type UseTripMapParams = {
  trip: Trip;
  plantPosition: GeoPoint;
  deliveryObjectPosition: GeoPoint;
  deliveryObject: string;
};

function toLatLng(point: GeoPoint): L.LatLngTuple {
  return [point.lat, point.lng];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createPopupMarkup(title: string, text: string): string {
  return `<div class="leaflet-trip-popup"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(
    text,
  )}</span></div>`;
}

function getDistanceScore(from: GeoPoint, to: GeoPoint): number {
  const latDelta = from.lat - to.lat;
  const lngDelta = from.lng - to.lng;

  return latDelta * latDelta + lngDelta * lngDelta;
}

function isSamePoint(from: GeoPoint, to: GeoPoint): boolean {
  return Math.abs(from.lat - to.lat) < 0.0001 && Math.abs(from.lng - to.lng) < 0.0001;
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function toDegrees(value: number): number {
  return (value * 180) / Math.PI;
}

function getBearing(from: GeoPoint, to: GeoPoint): number {
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const y = Math.sin(lngDelta) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDelta);

  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

function getRouteTarget(trip: Trip, deliveryObjectPosition: GeoPoint): GeoPoint {
  if (!trip.routePath || trip.routePath.length === 0) {
    return deliveryObjectPosition;
  }

  let closestPointIndex = 0;
  let closestPointScore = Number.POSITIVE_INFINITY;

  trip.routePath.forEach((point, index) => {
    const score = getDistanceScore(point, trip.gpsPosition);

    if (score < closestPointScore) {
      closestPointScore = score;
      closestPointIndex = index;
    }
  });

  for (let index = closestPointIndex + 1; index < trip.routePath.length; index += 1) {
    const point = trip.routePath[index];

    if (!isSamePoint(point, trip.gpsPosition)) {
      return point;
    }
  }

  return deliveryObjectPosition;
}

function getTruckRotation(trip: Trip, deliveryObjectPosition: GeoPoint): number | null {
  if (trip.speed <= 0 || (trip.status !== 'loaded_departed' && trip.status !== 'in_transit')) {
    return null;
  }

  const routeTarget = getRouteTarget(trip, deliveryObjectPosition);

  if (isSamePoint(routeTarget, trip.gpsPosition)) {
    return null;
  }

  return getBearing(trip.gpsPosition, routeTarget);
}

function renderMapContent({
  map,
  layerGroup,
  trip,
  plantPosition,
  deliveryObjectPosition,
  deliveryObject,
}: UseTripMapParams & {
  map: L.Map;
  layerGroup: L.LayerGroup;
}): void {
  layerGroup.clearLayers();

  if (trip.routePath && trip.routePath.length > 1) {
    L.polyline(trip.routePath.map(toLatLng), {
      color: '#1457ff',
      weight: 4,
      opacity: 0.75,
    }).addTo(layerGroup);
  }

  L.marker(toLatLng(plantPosition), { icon: plantMarkerIcon })
    .bindPopup(createPopupMarkup('Завод', 'Площадка отгрузки'))
    .addTo(layerGroup);

  L.marker(toLatLng(deliveryObjectPosition), { icon: siteMarkerIcon })
    .bindPopup(createPopupMarkup('Объект', deliveryObject))
    .addTo(layerGroup);

  const truckRotation = getTruckRotation(trip, deliveryObjectPosition);

  L.marker(toLatLng(trip.gpsPosition), {
    icon: createTruckMarkerIcon(truckRotation),
    zIndexOffset: 1000,
  })
    .bindPopup(createPopupMarkup(trip.truck, `${trip.gpsPosition.heading} · ${trip.eta ?? 'Без ETA'}`))
    .addTo(layerGroup);

  const boundsPoints = [
    plantPosition,
    deliveryObjectPosition,
    trip.gpsPosition,
    ...(trip.routePath ?? []),
  ];

  if (boundsPoints.length > 1) {
    map.fitBounds(boundsPoints.map(toLatLng), {
      padding: [28, 28],
      maxZoom: MAP_DEFAULT_ZOOM,
    });
    return;
  }

  map.setView(toLatLng(trip.gpsPosition), MAP_FALLBACK_ZOOM);
}

export function useTripMap(params: UseTripMapParams): {
  containerRef: MutableRefObject<HTMLDivElement | null>;
} {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    map.attributionControl.setPrefix(false);

    L.tileLayer(MAP_TILE_URL, {
      attribution: MAP_TILE_ATTRIBUTION,
      maxZoom: MAP_MAX_ZOOM,
      subdomains: MAP_TILE_SUBDOMAINS,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);

    mapRef.current = map;
    layerGroupRef.current = layerGroup;

    renderMapContent({
      map,
      layerGroup,
      ...params,
    });

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layerGroupRef.current) {
      return;
    }

    renderMapContent({
      map: mapRef.current,
      layerGroup: layerGroupRef.current,
      ...params,
    });
  }, [
    params.deliveryObject,
    params.plantPosition,
    params.deliveryObjectPosition,
    params.trip,
  ]);

  return {
    containerRef,
  };
}
