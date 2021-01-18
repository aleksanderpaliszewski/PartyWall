import React from 'react';
import renderer from 'react-test-renderer';
import {getRegisterProps} from '../utils/navigation';
import Register from '../../src/scenes/Register';

describe('register', () => {
  it('should render without crashing', () => {
    const mockProps = getRegisterProps();

    const rendered = renderer.create(<Register {...mockProps} />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('should render correctly', () => {
    const mockProps = getRegisterProps();

    const rendered = renderer.create(<Register {...mockProps} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
