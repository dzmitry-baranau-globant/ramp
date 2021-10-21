import { Provider } from 'react-redux';
import store from '@store/store';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

const theme = createTheme({
  typography: {
    fontFamily: 'Gilroy',
    allVariants: {
      color: '#fff',
    },
  },
});

const TestWrapper = ({ children }: { children: any }) => (
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </Router>
);

export default TestWrapper;
