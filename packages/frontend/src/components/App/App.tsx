import React from 'react';
import RecommendationsRow from '@components/RecommendationsRow';
import Header from '@components/Header';
import useRecommendationsData from '@components/App/hooks/useRecommendationsData';
import Footer from '@components/Footer';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import { RootState } from '../../store/store';

function App() {
  const recommendationsData = useRecommendationsData();
  const isExtendedGrid = useSelector((state: RootState) => state.recommendations.extendedGrid);
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.recommendationsWrapper}>
        {recommendationsData.map((recommendationRow) => (
          <div className={styles.recommendationRowWrapper} key={recommendationRow.title.text}>
            <RecommendationsRow
              {...recommendationRow}
              slideHeight={isExtendedGrid ? recommendationRow?.slideHeight : 200}
              slideWidth={isExtendedGrid ? recommendationRow?.slideWidth : 175}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;