import React from 'react';
import { Typography } from '@mui/material';
import styles from './Footer.module.scss';

export interface IFooterProps {}

/**
 * Footer
 */
function Footer(props: IFooterProps) {
  const {} = props;
  return (
    <div className={styles.root}>
      <Typography>Footer</Typography>
    </div>
  );
}

export default Footer;
