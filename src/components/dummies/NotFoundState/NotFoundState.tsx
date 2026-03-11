import { Stack, Typography } from '@mui/material';

import { AppButton } from '../../ui/AppButton';
import { AppCard } from '../../ui/AppCard';

type NotFoundStateProps = {
  query: string;
  onReset: () => void;
};

export function NotFoundState({ query, onReset }: NotFoundStateProps): JSX.Element {
  return (
    <AppCard sx={{ p: 3, maxWidth: 760 }}>
      <Stack spacing={1.5}>
        <Typography variant="overline" color="primary.dark">
          Заказ не найден
        </Typography>
        <Typography variant="h3">{query || 'Этот номер'} не найден в системе</Typography>
        <Typography variant="body2" color="text.secondary">
          Проверьте номер из SMS или подтверждения от завода. Если номер корректный, клиенту нужно
          связаться с диспетчером.
        </Typography>
        <AppButton variant="outlined" onClick={onReset} sx={{ alignSelf: 'flex-start', mt: 1 }}>
          Вернуться к поиску
        </AppButton>
      </Stack>
    </AppCard>
  );
}
