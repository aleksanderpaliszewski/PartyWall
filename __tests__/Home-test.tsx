import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import Home from '../src/scenes/Home';
import {getHomeProps} from './navigation';

configure({adapter: new Adapter()});
describe('Home', () => {
  it('render', () => {
    const mockProps = getHomeProps();

    const wrapper = shallow(<Home {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
