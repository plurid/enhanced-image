import React from 'react';
import { shallow } from 'enzyme';
import { EnhancedImage } from './';

it('renders without crashing', () => {
    shallow(<EnhancedImage />);
});
