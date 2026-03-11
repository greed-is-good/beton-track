import { Box, Stack, Typography } from '@mui/material';

import type { Trip } from '../../../models/order/client';
import { TRIP_STATUS_LABELS } from '../../../constants/orderTracking';
import { formatShortTime } from '../../../utils/format';
import { AppCard } from '../../ui/AppCard';
import { StatusChip } from '../../ui/StatusChip';

type TripRailProps = {
  trips: Trip[];
  selectedTripNumber: number;
  onSelectTrip: (tripNumber: number) => void;
};

export function TripRail({ trips, selectedTripNumber, onSelectTrip }: TripRailProps): JSX.Element {
  return (
    <AppCard sx={{ p: 2.5, display: { xs: 'block', lg: 'none' } }}>
      <Stack direction="row" spacing={1.25} sx={{ overflowX: 'auto', pb: 0.5 }}>
        {trips.map((trip) => (
          <Box
            key={trip.tripNumber}
            component="button"
            type="button"
            onClick={() => onSelectTrip(trip.tripNumber)}
            sx={{
              minWidth: 210,
              p: 1.75,
              borderRadius: 2,
              border: '1px solid',
              borderColor:
                trip.tripNumber === selectedTripNumber ? 'primary.main' : 'divider',
              backgroundColor:
                trip.tripNumber === selectedTripNumber ? 'rgba(20,87,255,0.06)' : '#fff',
              textAlign: 'left',
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'text.secondary' }}
            >
              {trip.tripNumber}/{trip.totalTrips}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {trip.truck}
            </Typography>
            <StatusChip
              label={TRIP_STATUS_LABELS[trip.status]}
              color={trip.tripNumber === selectedTripNumber ? 'primary' : 'default'}
              sx={{ mt: 1 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              ETA: {trip.eta ?? 'Завершен'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Обновлено: {formatShortTime(trip.updatedAt)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </AppCard>
  );
}
