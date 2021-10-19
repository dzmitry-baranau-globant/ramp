import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { Popover, Typography } from '@mui/material';
import {
  getCachedEverydayRecommendations,
  getCurrentDate,
} from '@store/localStorage/recommendationsStorage';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCachedRecommendationsDay,
  setRecommendations,
} from '@store/reducers/recommendationsSlice';
import styled from 'styled-components';
import { RootState } from '@store/store';

export interface ICachedRecommendationsDropdownProps {}

const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  height: 46px;
  border-radius: 8px;
  text-transform: none;
  span {
    font-size: 12px;
    margin-top: -6px;
  }
`;

const StyledPickButton = styled(Button)`
  background: ${({ selected }: { selected: boolean }) => (selected ? 'rgba(0,0,0,0.05)' : 'white')};
`;

/**
 * Dropdown with recommendations from the local storage
 */
function CachedRecommendationsDropdown() {
  const cachedRecommendations = getCachedEverydayRecommendations();
  const { selectedCachedDate } = useSelector((state: RootState) => state.recommendations);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const recommendationsDates = Object.keys(cachedRecommendations);
  const onRecommendationsDateChange = (date: string) => {
    dispatch(selectCachedRecommendationsDay({ date }));
    dispatch(setRecommendations({ sections: cachedRecommendations[date], date }));
  };
  return (
    <>
      <StyledButton variant="outlined" onClick={handlePopoverOpen}>
        Cached Recs
        {selectedCachedDate && <span>{selectedCachedDate}</span>}
      </StyledButton>
      <Popover
        id="drpopdown"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recommendationsDates.length > 0 ? (
            recommendationsDates.map((date) => {
              const handleClick = () => onRecommendationsDateChange(date);
              const isSelected = date === selectedCachedDate;
              return (
                <StyledPickButton selected={isSelected} key={date} onClick={handleClick}>
                  {`Recommendations from
            ${date}`}
                </StyledPickButton>
              );
            })
          ) : (
            <Typography sx={{ p: 2 }}>No cached recommendations</Typography>
          )}
        </div>
      </Popover>
    </>
  );
}

export default CachedRecommendationsDropdown;
