import type { GeoPoint } from '../common/client';

export type OrderStatus = 'accepted' | 'in_progress' | 'trips_active' | 'completed';

export type TripStatus =
  | 'assigned'
  | 'loaded_departed'
  | 'in_transit'
  | 'arrived'
  | 'unloading'
  | 'idle'
  | 'completed';

export type GpsPosition = GeoPoint & {
  progress: number;
  heading: string;
  routeLabel: string;
};

export type Trip = {
  tripNumber: number;
  totalTrips: number;
  status: TripStatus;
  truck: string;
  driver: string;
  volume: number;
  eta: string | null;
  arrivedAt: string | null;
  finishedAt: string | null;
  updatedAt: string;
  gpsPosition: GpsPosition;
  routePath?: GeoPoint[] | null;
  speed: number;
  unloadingFreeMinutesLeft: number | null;
  idleMinutes: number;
  idleChargeOptional: number | null;
};

export type Order = {
  orderNumber: string;
  customerName: string;
  deliveryObject: string;
  totalVolume: number;
  deliveryWindow: string;
  updatedAt: string;
  plantPosition: GeoPoint;
  deliveryObjectPosition: GeoPoint;
  status: OrderStatus;
  trips: Trip[];
};
