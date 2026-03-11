import { Box, Stack, Typography } from '@mui/material';

import type { Order } from '../../../models/order/client';
import { ORDER_STATUS_LABELS } from '../../../constants/orderTracking';
import { formatDateTime } from '../../../utils/format';
import { AppCard } from '../../ui/AppCard';
import { StatusChip } from '../../ui/StatusChip';

type OrderSummaryProps = {
  order: Order;
  counters: {
    total: number;
    completed: number;
    inTransit: number;
    onSite: number;
  };
  lead: {
    inTransit: {
      truck: string;
      eta: string | null;
    } | null;
    onSite: Array<{
      truck: string;
    }>;
  };
};

const statItems = [
  { key: 'total', label: 'Всего рейсов' },
  { key: 'completed', label: 'Завершено' },
  { key: 'inTransit', label: 'В пути' },
  { key: 'onSite', label: 'На объекте' },
] as const;

export function OrderSummary({ order, counters, lead }: OrderSummaryProps): JSX.Element {
  return (
    <AppCard sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={1.5}
        >
          <Box>
            <Typography variant="overline" color="primary.dark">
              Заказ {order.orderNumber}
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' } }}>
              {order.deliveryObject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.customerName}
            </Typography>
          </Box>
          <StatusChip color="primary" label={ORDER_STATUS_LABELS[order.status]} />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(5, 1fr)' },
          }}
        >
          <Box className="compact-panel">
            <Typography variant="caption" color="text.secondary">
              Объект доставки
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {order.deliveryObject}
            </Typography>
          </Box>
          <Box className="compact-panel">
            <Typography variant="caption" color="text.secondary">
              Общий объем
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {order.totalVolume} м3
            </Typography>
          </Box>
          <Box className="compact-panel">
            <Typography variant="caption" color="text.secondary">
              Плановое окно
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {order.deliveryWindow}
            </Typography>
          </Box>
          <Box className="compact-panel">
            <Typography variant="caption" color="text.secondary">
              Последнее обновление
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {formatDateTime(order.updatedAt)}
            </Typography>
          </Box>
          <Box className="compact-panel compact-panel--soft">
            <Typography variant="caption" color="text.secondary">
              Сейчас в пути
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {lead.inTransit ? `${lead.inTransit.truck} · ETA ${lead.inTransit.eta ?? '—'}` : 'Нет'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
          }}
        >
          {statItems.map((item) => (
            <Box key={item.key} className="stat-panel">
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>
                {counters[item.key]}
              </Typography>
            </Box>
          ))}

          <Box className="stat-panel stat-panel--focus">
            <Typography variant="caption" color="text.secondary">
              На объекте сейчас
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {lead.onSite.length ? lead.onSite.map((trip) => trip.truck).join(', ') : 'Нет машин'}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </AppCard>
  );
}
