export function formatDateTime(value: string | null): string {
  if (!value) {
    return 'Нет данных';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatShortTime(value: string | null): string {
  if (!value) {
    return 'Нет данных';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatCurrency(value: number | null): string {
  if (value === null) {
    return 'По договору';
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
}
