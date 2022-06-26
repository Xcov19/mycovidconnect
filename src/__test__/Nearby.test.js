/*jshint esversion: 6 */

import React from "react";
import { Nearby as OgNearby } from "./../containers/Nearby";
import { shallow } from 'enzyme';

describe('Testing Nearby component', () => {

  const params = {
    lat: 12,
    lng: 30
  }

  beforeAll(() => {
    window.fetch = jest.fn()
    global.fetch = jest.fn();
    window.fetch = jest.fn();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: [] })
    })
  });


  it('Functions inside componentdidmount should run successfully', () => {
    let prop = { auth0: { isAuthenticated: false } }
    let wrapper = shallow(<OgNearby {...prop} />);

    // mocking fetch
    global.fetch = jest.fn((arg) => Promise.resolve({
      json: () => { return Promise.resolve({ results: [{}] }) }
    }));

    wrapper.setState({ params: params })
    const instance = wrapper.instance();

    instance.getVaccineSessionsByPin = jest.fn((arg) => { });
    
    const getAddressFromLocation = jest.spyOn(instance, 'getAddressFromLocation');
    instance.getAddressFromLocation();

    expect(getAddressFromLocation).toBeCalledTimes(1)
  })

})