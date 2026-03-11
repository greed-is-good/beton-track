import { lazy, Suspense } from 'react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';

import type { Order, Trip } from '../../../models/order/client';
import { TRIP_STATUS_LABELS } from '../../../constants/orderTracking';
import { formatCurrency, formatDateTime, formatShortTime } from '../../../utils/format';
import { StateAlert } from '../../ui/StateAlert';
import { AppCard } from '../../ui/AppCard';
import { StatusChip } from '../../ui/StatusChip';

const TripMap = lazy(async () => {
  const module = await import('../TripMap');

  return {
    default: module.TripMap,
  };
});

function TripMapFallback(): JSX.Element {
  return (
    <AppCard sx={{ p: 2.5 }}>
      <Typography variant="h4">Карта выбранного рейса</Typography>

      <Box className="trip-map__canvas trip-map__canvas--loading">
        <Stack spacing={1.5} sx={{ p: 2 }}>
          <Skeleton variant="text" width="36%" height={28} />
          <Skeleton variant="rounded" width="100%" height={216} />
        </Stack>
      </Box>
    </AppCard>
  );
}

type TripDetailsProps = {
  order: Order;
  trip: Trip;
};

export function TripDetails({ order, trip }: TripDetailsProps): JSX.Element {
  return (
    <Stack spacing={2}>
      <AppCard sx={{ p: 2.5 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1}
        >
          <Box>
            <Typography variant="overline" color="primary.dark">
              Выбранный рейс
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
              {trip.truck}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Рейс {trip.tripNumber}/{trip.totalTrips} · {trip.driver}
            </Typography>
          </Box>
          <StatusChip color="primary" label={TRIP_STATUS_LABELS[trip.status]} />
        </Stack>

        <Box
          sx={{
            mt: 2,
            display: 'grid',
            gap: 1,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Box className="subtile">
            <Typography variant="caption" color="text.secondary">
              ETA
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {trip.eta ?? 'Рейс завершен'}
            </Typography>
          </Box>
          <Box className="subtile">
            <Typography variant="caption" color="text.secondary">
              Скорость
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {trip.speed} км/ч
            </Typography>
          </Box>
          <Box className="subtile">
            <Typography variant="caption" color="text.secondary">
              Объект доставки
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {order.deliveryObject}
            </Typography>
          </Box>
          <Box className="subtile">
            <Typography variant="caption" color="text.secondary">
              GPS обновлено
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {formatDateTime(trip.updatedAt)}
            </Typography>
          </Box>
          <Box className="subtile">
            <Typography variant="caption" color="text.secondary">
              Прибытие
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {trip.arrivedAt ? formatShortTime(trip.arrivedAt) : 'Еще не прибыл'}
            </Typography>
          </Box>
          <Box className="subtile">
            <Typography variant="caption" color="text.secondary">
              Завершение
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {trip.finishedAt ? formatShortTime(trip.finishedAt) : 'Рейс активен'}
            </Typography>
          </Box>
        </Box>
      </AppCard>

      {trip.status === 'unloading' && trip.unloadingFreeMinutesLeft !== null ? (
        <StateAlert severity="success">
          Бесплатная выгрузка: осталось {trip.unloadingFreeMinutesLeft} минут
        </StateAlert>
      ) : null}

      {trip.status === 'idle' ? (
        <StateAlert severity="warning">
          Простой: {trip.idleMinutes} минут. Ориентировочное начисление:{' '}
          {formatCurrency(trip.idleChargeOptional)}.
        </StateAlert>
      ) : null}

      <Suspense fallback={<TripMapFallback />}>
        <TripMap
          trip={trip}
          deliveryObject={order.deliveryObject}
          plantPosition={order.plantPosition}
          deliveryObjectPosition={order.deliveryObjectPosition}
        />
      </Suspense>
    </Stack>
  );
}
