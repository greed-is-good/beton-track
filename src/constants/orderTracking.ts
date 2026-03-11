import type { OrderStatus, TripStatus } from '../models/order/client';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  accepted: 'Заявка принята',
  in_progress: 'Заказ в работе',
  trips_active: 'Рейсы выполняются',
  completed: 'Заказ завершен',
};

export const TRIP_STATUS_LABELS: Record<TripStatus, string> = {
  assigned: 'Машина назначена',
  loaded_departed: 'Загружена / выехала',
  in_transit: 'В пути',
  arrived: 'Прибыла на объект',
  unloading: 'Выгрузка',
  idle: 'Простой',
  completed: 'Завершен',
};

export const TRIP_STATUS_PRIORITY: Record<TripStatus, number> = {
  idle: 0,
  unloading: 1,
  arrived: 2,
  in_transit: 3,
  loaded_departed: 4,
  assigned: 5,
  completed: 6,
};

export const ORDER_TIMELINE_STEPS = [
  {
    title: 'Заявка принята',
    description: 'Заказ подтвержден и поставлен в работу.',
  },
  {
    title: 'Заказ в работе',
    description: 'Идет подготовка к отгрузке и назначение машин.',
  },
  {
    title: 'Рейсы выполняются',
    description: 'Машины едут на объект или уже находятся на площадке.',
  },
  {
    title: 'Заказ завершен',
    description: 'Все рейсы выполнены.',
  },
];
