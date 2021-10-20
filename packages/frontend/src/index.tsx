import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '@components/App';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
// import '@fontsource/work-sans/900.css';
// import '@fontsource/work-sans/800.css';
// import '@fontsource/work-sans/700.css';
// import '@fontsource/work-sans/600.css';
// import '@fontsource/work-sans/500.css';
// import '@fontsource/work-sans/400.css';
// import '@fontsource/work-sans/300.css';
// import '@fontsource/work-sans/200.css';
// import '@fontsource/work-sans/100.css';
import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme({
  typography: {
    fontFamily: 'Gilroy',
    allVariants: {
      color: '#fff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

export const test = 'test';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
