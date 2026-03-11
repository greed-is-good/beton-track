import type { FormEvent } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';

import { LoadingState } from '../../dummies/LoadingState';
import { NotFoundState } from '../../dummies/NotFoundState';
import { OrderSummary } from '../../dummies/OrderSummary';
import { OrderTimeline } from '../../dummies/OrderTimeline';
import { SearchScreen } from '../../dummies/SearchScreen';
import { TripCard } from '../../dummies/TripCard';
import { TripDetails } from '../../dummies/TripDetails';
import { TripRail } from '../../dummies/TripRail';
import { AppButton } from '../../ui/AppButton';
import { AppTextField } from '../../ui/AppTextField';
import { useOrderTracking } from './useOrderTracking';

export function OrderTracking(): JSX.Element {
  const {
    query,
    viewState,
    order,
    message,
    counters,
    leadTrips,
    selectedTrip,
    timelineStep,
    setQuery,
    setSelectedTripNumber,
    openOrder,
    resetSearch,
  } = useOrderTracking();

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void openOrder();
  }

  function handlePickDemoOrder(orderNumber: string): void {
    setQuery(orderNumber);
    void openOrder(orderNumber);
  }

  return (
    <Box sx={{ py: { xs: 2, md: 3 } }}>
      <Container maxWidth="xl">
        <Paper
          variant="outlined"
          sx={{
            px: { xs: 2, md: 2.5 },
            py: 1.5,
            mb: 2.5,
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box className="brand-mark" />
            <Box>
              <Typography variant="subtitle1" fontWeight={800}>
                beton-track
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Клиентский трекинг доставки бетона
              </Typography>
            </Box>
          </Stack>

          {viewState === 'found' ? (
            <Stack
              component="form"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              onSubmit={handleSearchSubmit}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              <AppTextField
                size="small"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Номер заказа"
                sx={{ minWidth: { md: 260 } }}
              />
              <AppButton type="submit" variant="contained">
                Найти
              </AppButton>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Внешний сервис для клиента вместо звонка диспетчеру
            </Typography>
          )}
        </Paper>

        <Stack spacing={2.5}>
          {(viewState === 'search' || viewState === 'not_found') && (
            <>
              <SearchScreen
                query={query}
                isLoading={false}
                message={viewState === 'search' ? message : null}
                onQueryChange={setQuery}
                onSubmit={handleSearchSubmit}
                onPickDemoOrder={handlePickDemoOrder}
              />
              {viewState === 'not_found' ? <NotFoundState query={query} onReset={resetSearch} /> : null}
            </>
          )}

          {viewState === 'loading' ? <LoadingState /> : null}

          {viewState === 'found' && order && counters && leadTrips && selectedTrip ? (
            <Stack spacing={2.5}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2.5,
                  gridTemplateColumns: { xs: '1fr', xl: '1.15fr 0.85fr' },
                  alignItems: 'start',
                }}
              >
                <OrderSummary order={order} counters={counters} lead={leadTrips} />
                <OrderTimeline activeStep={timelineStep} />
              </Box>

              <TripRail
                trips={order.trips}
                selectedTripNumber={selectedTrip.tripNumber}
                onSelectTrip={setSelectedTripNumber}
              />

              <Box
                sx={{
                  display: 'grid',
                  gap: 2.5,
                  gridTemplateColumns: { xs: '1fr', lg: '0.95fr 1.05fr' },
                  alignItems: 'start',
                }}
              >
                <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, display: { xs: 'none', lg: 'block' } }}>
                  <Typography variant="h4">Рейсы</Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Stack spacing={1.25}>
                    {order.trips.map((trip) => (
                      <TripCard
                        key={trip.tripNumber}
                        trip={trip}
                        isSelected={trip.tripNumber === selectedTrip.tripNumber}
                        onSelect={setSelectedTripNumber}
                      />
                    ))}
                  </Stack>
                </Paper>

                <TripDetails order={order} trip={selectedTrip} />
              </Box>
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
