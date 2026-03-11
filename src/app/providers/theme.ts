import { alpha, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1457ff',
      dark: '#0b43cd',
      light: '#5d8bff',
    },
    secondary: {
      main: '#c5792e',
    },
    background: {
      default: '#f2f4f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#18212f',
      secondary: '#677487',
    },
    divider: alpha('#1a2b49', 0.12),
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: ['Manrope', 'Segoe UI', 'sans-serif'].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
      lineHeight: 0.96,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    overline: {
      fontWeight: 800,
      letterSpacing: '0.12em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(180deg, #f7f8fb 0%, #eef2f8 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 12px 32px rgba(24, 33, 47, 0.05)',
          border: `1px solid ${alpha('#1a2b49', 0.08)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: alpha('#ffffff', 0.72),
        },
      },
    },
  },
});
