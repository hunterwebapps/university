import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';
import { amber, orange, blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: orange,
    background: blueGrey,
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MaterialThemeProvider theme={theme}>
      {children}
    </MaterialThemeProvider>
  );
};
