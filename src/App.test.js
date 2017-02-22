import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders itself', () => {
  const enzymeWrapper = shallow(<App></App>)
    const divWrapper = enzymeWrapper.find('div')
    expect(divWrapper.hasClass('app')).toBe(true)
    expect(divWrapper.find('Connect(Component)').getNodes().length).toBe(6)
});
