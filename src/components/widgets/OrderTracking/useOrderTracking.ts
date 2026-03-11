import { startTransition, useEffect, useMemo, useState } from 'react';

import { fetchOrderByNumber } from '../../../api/trackingApi';
import { TRIP_STATUS_PRIORITY } from '../../../constants/orderTracking';
import type { Order, OrderStatus, Trip } from '../../../models/order/client';

export type ViewState = 'search' | 'loading' | 'found' | 'not_found';

function getInitialQuery(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('order') ?? '';
}

function setOrderParam(orderNumber: string): void {
  const url = new URL(window.location.href);

  if (orderNumber) {
    url.searchParams.set('order', orderNumber);
  } else {
    url.searchParams.delete('order');
  }

  window.history.replaceState({}, '', url);
}

function sortTrips(trips: Trip[]): Trip[] {
  return [...trips].sort((left, right) => {
    const priorityDiff = TRIP_STATUS_PRIORITY[left.status] - TRIP_STATUS_PRIORITY[right.status];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return left.tripNumber - right.tripNumber;
  });
}

function getOrderCounters(order: Order): {
  total: number;
  completed: number;
  inTransit: number;
  onSite: number;
} {
  return {
    total: order.trips.length,
    completed: order.trips.filter((trip) => trip.status === 'completed').length,
    inTransit: order.trips.filter((trip) =>
      ['loaded_departed', 'in_transit'].includes(trip.status),
    ).length,
    onSite: order.trips.filter((trip) => ['arrived', 'unloading', 'idle'].includes(trip.status))
      .length,
  };
}

function getLeadingTrips(order: Order): {
  inTransit: { truck: string; eta: string | null } | null;
  onSite: Array<{ truck: string }>;
} {
  return {
    inTransit:
      order.trips.find((trip) => ['loaded_departed', 'in_transit'].includes(trip.status)) ?? null,
    onSite: order.trips
      .filter((trip) => ['arrived', 'unloading', 'idle'].includes(trip.status))
      .map((trip) => ({ truck: trip.truck })),
  };
}

function getTimelineStep(status: OrderStatus): number {
  switch (status) {
    case 'accepted':
      return 0;
    case 'in_progress':
      return 1;
    case 'trips_active':
      return 2;
    case 'completed':
      return 3;
  }
}

export function useOrderTracking() {
  const [query, setQuery] = useState(getInitialQuery());
  const [viewState, setViewState] = useState<ViewState>(getInitialQuery() ? 'loading' : 'search');
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedTripNumber, setSelectedTripNumber] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function openOrder(rawValue?: string): Promise<void> {
    const nextValue = (rawValue ?? query).trim().toUpperCase();

    if (!nextValue) {
      setMessage('Введите номер заказа, который клиент получил от завода.');
      setViewState('search');
      return;
    }

    setMessage(null);
    setQuery(nextValue);
    setOrderParam(nextValue);
    setViewState('loading');

    const result = await fetchOrderByNumber(nextValue);

    if (!result) {
      startTransition(() => {
        setOrder(null);
        setSelectedTripNumber(null);
        setMessage('Заказ не найден. Проверьте номер или откройте демо-заказ.');
        setViewState('not_found');
      });
      return;
    }

    const sortedTrips = sortTrips(result.trips);

    startTransition(() => {
      setOrder({ ...result, trips: sortedTrips });
      setSelectedTripNumber(sortedTrips[0]?.tripNumber ?? null);
      setViewState('found');
    });
  }

  useEffect(() => {
    const initialQuery = getInitialQuery();

    if (initialQuery) {
      void openOrder(initialQuery);
    }
  }, []);

  const counters = useMemo(() => (order ? getOrderCounters(order) : null), [order]);
  const leadTrips = useMemo(() => (order ? getLeadingTrips(order) : null), [order]);
  const timelineStep = useMemo(() => (order ? getTimelineStep(order.status) : 0), [order]);
  const selectedTrip = useMemo(
    () => order?.trips.find((trip) => trip.tripNumber === selectedTripNumber) ?? null,
    [order, selectedTripNumber],
  );

  function resetSearch(): void {
    setOrder(null);
    setQuery('');
    setMessage(null);
    setSelectedTripNumber(null);
    setOrderParam('');
    setViewState('search');
  }

  return {
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
  };
}
