import type { FormEvent } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { AppButton } from '../../ui/AppButton';
import { AppCard } from '../../ui/AppCard';
import { AppTextField } from '../../ui/AppTextField';

type SearchScreenProps = {
  query: string;
  isLoading: boolean;
  message: string | null;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPickDemoOrder: (orderNumber: string) => void;
};

const demoOrders = ['BZ-2026-0418', 'BZ-2026-0197'];

export function SearchScreen({
  query,
  isLoading,
  message,
  onQueryChange,
  onSubmit,
  onPickDemoOrder,
}: SearchScreenProps): JSX.Element {
  return (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      <Box sx={{ maxWidth: 980 }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '4rem' }, color: 'primary.main' }}>
          Проверка статуса заказа бетона
        </Typography>
      </Box>

      <AppCard sx={{ p: { xs: 2.5, md: 3 }, maxWidth: 1080 }}>
        <Stack component="form" spacing={2} onSubmit={onSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
            <AppTextField
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Введите номер заказа"
              autoComplete="off"
              fullWidth
              size="medium"
            />
            <AppButton
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ minWidth: { md: 168 }, minHeight: 56 }}
            >
              {isLoading ? 'Загрузка...' : 'Показать статус'}
            </AppButton>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            По номеру заказа клиент увидит общий статус, список рейсов и карту выбранной машины.
          </Typography>

          {message ? (
            <Box
              sx={{
                p: '12px 14px',
                borderRadius: '14px',
                background: 'rgba(255, 239, 231, 0.95)',
                border: '1px solid rgba(203, 107, 43, 0.18)',
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                {message}
              </Typography>
            </Box>
          ) : null}

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {demoOrders.map((orderNumber) => (
              <AppButton
                key={orderNumber}
                type="button"
                size="small"
                variant="text"
                onClick={() => onPickDemoOrder(orderNumber)}
                sx={{ fontFamily: '"IBM Plex Mono", monospace', px: 0 }}
              >
                {orderNumber}
              </AppButton>
            ))}
          </Stack>
        </Stack>
      </AppCard>
    </Box>
  );
}
