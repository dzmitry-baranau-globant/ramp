import React from 'react';
import { render } from '@testing-library/react';
import RecommendationsRow from '../RecommendationsRow';
import TestWrapper from '../../../test-utils';

describe('<RecommendationsRow />', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <TestWrapper>
        {/* <RecommendationsRow /> */}
      </TestWrapper>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
