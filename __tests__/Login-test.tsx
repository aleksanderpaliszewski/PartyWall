import React from 'react';
import Login from '../src/scenes/Login';
import renderer from 'react-test-renderer';
import {getLoginProps} from './navigation';

describe('login', () => {
  it('should render without crashing', () => {
    const mockProps = getLoginProps();

    const rendered = renderer.create(<Login {...mockProps} />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('should render correctly', () => {
    const mockProps = getLoginProps();

    const rendered = renderer.create(<Login {...mockProps} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
