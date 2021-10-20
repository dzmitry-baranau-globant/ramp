import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import styles from './SubNavigation.module.scss';

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ isDisabled }: { isDisabled: boolean }) => (isDisabled ? 'rgba(149,149,149,0.73)' : '#188ad9')};
`;

const StyledLinkText = styled(Typography)`
  color: ${({ isDisabled }: { isDisabled: boolean }) => (isDisabled ? 'rgba(255,255,255,0.36)' : '#188ad9')};
  &:hover {
    color: ${({ isDisabled }: { isDisabled: boolean }) => (isDisabled ? 'rgba(149,149,149,0.73)' : '#188ad9')};
  }
`;

export interface ISubNavigationProps {}
/**
 * Subnavigation
 */
function SubNavigation(props: ISubNavigationProps) {
  const {} = props;
  const subNavigationsMenu = [
    { name: 'Targeted Components', href: '/', isDisabled: false },
    { name: 'Sub Models', href: '/sub-models', isDisabled: true },
    { name: 'Content Ranking', href: '/content-ranking', isDisabled: true },
    { name: 'Recommendation Simulator', href: '/recommendations-simulator', isDisabled: true },
  ];
  return (
    <div className={styles.root}>
      {subNavigationsMenu.map(({ name, href, isDisabled }, index) => (
        <React.Fragment key={name}>
          {!isDisabled ? (
            <StyledLink
              exact
              to={href}
              activeClassName={styles.root__selected}
              isDisabled={isDisabled}
            >
              <Typography fontWeight={300} variant="body1" className={styles.linkText}>
                {name}
              </Typography>
            </StyledLink>
          ) : (
            <StyledLinkText
              title="Coming soon"
              isDisabled={isDisabled}
              fontWeight={300}
              variant="body1"
              className={styles.linkText}
            >
              {name}
            </StyledLinkText>
          )}

          {index !== subNavigationsMenu.length - 1 ? <span>|</span> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

export default SubNavigation;
