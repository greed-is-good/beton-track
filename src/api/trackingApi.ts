import { mockOrders } from './mockOrders';
import type { Order } from '../models/order/client';

const SEARCH_DELAY_MS = 900;

export async function fetchOrderByNumber(orderNumber: string): Promise<Order | null> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, SEARCH_DELAY_MS);
  });

  const normalizedValue = orderNumber.trim().toUpperCase();
  return mockOrders.find((item) => item.orderNumber === normalizedValue) ?? null;
}
