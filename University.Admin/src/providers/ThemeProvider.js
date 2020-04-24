import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';
import { blueGrey, blue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
      light: blue[300],
      dark: blue[900],
    },
    secondary: {
      main: blueGrey[400],
      light: blueGrey[100],
      dark: blueGrey[700],
    },
    background: blueGrey,
    error: {
      main: red[600],
    }
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MaterialThemeProvider theme={theme}>
      {children}
    </MaterialThemeProvider>
  );
};
