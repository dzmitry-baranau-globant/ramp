import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import TestWrapper from '../../../test-utils';

describe('<App />', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <TestWrapper>
        <App />
      </TestWrapper>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
