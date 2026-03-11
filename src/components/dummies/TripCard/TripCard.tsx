import { Box, Stack, Typography } from '@mui/material';

import type { Trip } from '../../../models/order/client';
import { TRIP_STATUS_LABELS } from '../../../constants/orderTracking';
import { formatShortTime } from '../../../utils/format';
import { StatusChip } from '../../ui/StatusChip';

type TripCardProps = {
  trip: Trip;
  isSelected: boolean;
  onSelect: (tripNumber: number) => void;
};

export function TripCard({ trip, isSelected, onSelect }: TripCardProps): JSX.Element {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(trip.tripNumber)}
      sx={{
        width: '100%',
        p: 2,
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        backgroundColor: isSelected ? 'rgba(20,87,255,0.04)' : '#fff',
        opacity: trip.status === 'completed' ? 0.68 : 1,
        textAlign: 'left',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'text.secondary' }}
          >
            Рейс {trip.tripNumber}/{trip.totalTrips}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 0.25 }}>
            {trip.truck}
          </Typography>
        </Box>
        <StatusChip
          label={TRIP_STATUS_LABELS[trip.status]}
          color={isSelected ? 'primary' : 'default'}
        />
      </Stack>

      <Box
        sx={{
          mt: 1.5,
          display: 'grid',
          gap: 1,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        <Box className="subtile">
          <Typography variant="caption" color="text.secondary">
            Водитель
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {trip.driver}
          </Typography>
        </Box>
        <Box className="subtile">
          <Typography variant="caption" color="text.secondary">
            Объем / ETA
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {trip.volume} м3 · {trip.eta ?? 'Завершен'}
          </Typography>
        </Box>
        <Box className="subtile">
          <Typography variant="caption" color="text.secondary">
            Обновление
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {formatShortTime(trip.updatedAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
