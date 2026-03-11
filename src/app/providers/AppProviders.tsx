import type { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './theme';

export function AppProviders({ children }: PropsWithChildren): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
