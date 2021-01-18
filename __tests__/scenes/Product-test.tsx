import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import Product from '../../src/scenes/Product';
import {getProductProps} from '../utils/navigation';

configure({adapter: new Adapter()});
describe('Product', () => {
  it('render', () => {
    const mockProps = getProductProps();

    const wrapper = shallow(<Product {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
