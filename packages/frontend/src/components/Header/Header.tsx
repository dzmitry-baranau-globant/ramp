import React, { useState } from 'react';
import {
  Switch, Typography, SwitchUnstyled, Button, Popover,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { OutdoorGrill, Person, VpnKey } from '@material-ui/icons';
import LoginButton from '@components/Header/components/LoginButton';
import CachedRecommendationsDropdown from '@components/Header/components/CachedRecommendationsDropdown';
import styles from './Header.module.scss';
import { setRecommendations, switchExtendedGrid } from '../../store/reducers/recommendationsSlice';
import { RootState } from '../../store/store';

export interface IHeaderProps {}

/**
 * Header component
 */
function Header(props: IHeaderProps) {
  enum Env {
    BETA = 'Beta',
    PRODUCTION = 'Production',
  }
  const [mode, setMode] = useState(Env.BETA);
  const handleOnChange = async () => {
    if (mode === Env.BETA) {
      // dispatch prod recommendations
      return setMode(Env.PRODUCTION);
    }
    // dispatch beta recommendations
    return setMode(Env.BETA);
  };

  const isExtendedGrid = useSelector((state: RootState) => state.recommendations.extendedGrid);
  const dispatch = useDispatch();
  const handleExtendedGridChange = () => {
    // @ts-ignore
    dispatch(switchExtendedGrid());
  };
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Typography className={styles.logo} variant="h4" fontWeight={800}>
            ramp
          </Typography>
          <div className={styles.settingsWrapper}>
            <div>
              <div className={styles.switchWrapper}>
                <Switch onChange={handleOnChange} className={styles.switch} />
                <Typography color="#fff">
                  {`Env: 
                  ${mode}`}
                </Typography>
              </div>
              <div className={styles.switchWrapper}>
                <Switch checked={isExtendedGrid} onChange={handleExtendedGridChange} />
                <Typography color="#fff">Extended Grid</Typography>
              </div>
            </div>
            <div className={styles.cachedButtonWrapper}>
              <CachedRecommendationsDropdown />
            </div>
          </div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
