import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import Home from '../src/scenes/Home';

configure({adapter: new Adapter()});
describe('Home', () => {
  it('render', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
