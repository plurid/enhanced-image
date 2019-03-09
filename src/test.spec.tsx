import React from 'react';
import { shallow } from 'enzyme';
import { StateShareImage } from './';

it('renders without crashing', () => {
    shallow(<StateShareImage />);
});
