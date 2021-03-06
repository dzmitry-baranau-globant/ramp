import React, { useEffect } from 'react';
import RecommendationsRow from '@components/RecommendationsRow';
import Header from '@components/Header';
import useRecommendationsData from '@components/App/hooks/useRecommendationsData';
import Footer from '@components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, Button, Snackbar, Typography,
} from '@mui/material';
import { closeSnackBarMessage, setSnackbarMessage } from '@store/reducers/sessionSlice';
import SubNavigation from '@components/SubNavigation';
import styles from './App.module.scss';
import { RootState } from '../../store/store';

function App() {
  const recommendationsData = useRecommendationsData();
  const isExtendedGrid = useSelector((state: RootState) => state.recommendations.extendedGrid);

  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.session.jwt);
  const { message, isOpen, snackbarSeverity } = useSelector(
    (state: RootState) => state.session.snackbar,
  );
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(setSnackbarMessage({ message: 'Please login to get latest recommendations' }));
    }
  }, [isSignedIn]);
  const handleClose = () => dispatch(closeSnackBarMessage());

  const subNavigationsMenu = [
    'Targeted Components',
    'Sub Models',
    'Content Ranking',
    'Recommendation Simulator',
  ];

  return (
    <div className={styles.app}>
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={4000}
        color="white"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity={snackbarSeverity}>
          {message}
        </Alert>
      </Snackbar>
      <Header />
      <div className={styles.recommendationsWrapper}>
        <SubNavigation />
        {recommendationsData.map((recommendationRow) => (
          <div className={styles.recommendationRowWrapper} key={recommendationRow.title.text}>
            <RecommendationsRow
              {...recommendationRow}
              slideHeight={isExtendedGrid ? recommendationRow?.slideHeight : 220}
              slideWidth={isExtendedGrid ? recommendationRow?.slideWidth : 200}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
