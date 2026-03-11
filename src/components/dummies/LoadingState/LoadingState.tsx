import { Box, Skeleton, Stack } from '@mui/material';

import { AppCard } from '../../ui/AppCard';

export function LoadingState(): JSX.Element {
  return (
    <Stack spacing={2.5}>
      <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' } }}>
        <AppCard sx={{ p: 3 }}>
          <Skeleton variant="text" width={240} height={28} />
          <Skeleton variant="text" width="45%" height={48} />
          <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, mt: 1 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={88} />
            ))}
          </Box>
        </AppCard>

        <AppCard sx={{ p: 3 }}>
          <Skeleton variant="text" width={180} height={28} />
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={64} sx={{ mt: 1.25 }} />
          ))}
        </AppCard>
      </Box>

      <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', xl: '0.95fr 1.05fr' } }}>
        <AppCard sx={{ p: 3 }}>
          <Skeleton variant="text" width={180} height={28} />
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={122} sx={{ mt: 1.5 }} />
          ))}
        </AppCard>

        <AppCard sx={{ p: 3 }}>
          <Skeleton variant="text" width={220} height={28} />
          <Skeleton variant="rounded" height={168} sx={{ mt: 1.5 }} />
          <Skeleton variant="rounded" height={300} sx={{ mt: 1.5 }} />
        </AppCard>
      </Box>
    </Stack>
  );
}
