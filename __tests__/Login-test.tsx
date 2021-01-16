import React from 'react';
import Login from '../src/scenes/Login';
import renderer from 'react-test-renderer';

describe('login', () => {
  it('should render without crashing', () => {
    const rendered = renderer.create(<Login />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('should render correctly', () => {
    const rendered = renderer.create(<Login />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
