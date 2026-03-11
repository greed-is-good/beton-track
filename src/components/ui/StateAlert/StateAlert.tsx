import { Alert, type AlertProps } from '@mui/material';

export function StateAlert(props: AlertProps): JSX.Element {
  return <Alert sx={{ borderRadius: 2.5, ...props.sx }} {...props} />;
}
