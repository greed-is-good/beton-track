import { Chip, type ChipProps } from '@mui/material';

export function StatusChip(props: ChipProps): JSX.Element {
  return <Chip size="small" {...props} />;
}
