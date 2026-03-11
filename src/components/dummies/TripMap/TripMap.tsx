import { Box, Stack, Typography } from '@mui/material';

import type { GeoPoint } from '../../../models/common/client';
import type { Trip } from '../../../models/order/client';
import { AppCard } from '../../ui/AppCard';
import { useTripMap } from './useTripMap';

type TripMapProps = {
  trip: Trip;
  deliveryObject: string;
  plantPosition: GeoPoint;
  deliveryObjectPosition: GeoPoint;
};

export function TripMap({
  trip,
  deliveryObject,
  plantPosition,
  deliveryObjectPosition,
}: TripMapProps): JSX.Element {
  const { containerRef } = useTripMap({
    trip,
    deliveryObject,
    plantPosition,
    deliveryObjectPosition,
  });

  return (
    <AppCard sx={{ p: 2.5 }}>
      <Typography variant="h4">Карта выбранного рейса</Typography>

      <div ref={containerRef} className="trip-map__canvas" />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mt: 1.5 }}>
        <Box className="subtile" sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Маршрут
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {trip.gpsPosition.routeLabel}
          </Typography>
        </Box>
        <Box className="subtile" sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Направление
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {trip.gpsPosition.heading}
          </Typography>
        </Box>
        <Box className="subtile" sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Координаты
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {trip.gpsPosition.lat.toFixed(4)}, {trip.gpsPosition.lng.toFixed(4)}
          </Typography>
        </Box>
      </Stack>
    </AppCard>
  );
}
