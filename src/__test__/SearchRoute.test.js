import React from 'react';
import ReactDOM from 'react-dom'
import SearchRoute from '../components/SearchRoute';
import { shallow } from 'enzyme';

test("Checking component renders without crashing ", ()=>{
    const props = {
        navigateTo: 'nearby',
    }
  
    const div = document.createElement("div");
    ReactDOM.render(<SearchRoute {...props} />, div);

})

test("Expects to find button HTML element with classname btn in the DOM ", ()=>{
    const props = {
        navigateTo: 'search',
        searchParam: "200"
    }

    const searchRoute = shallow(<SearchRoute  {...props}><button className="btn">Search</button></SearchRoute>);
    jest.spyOn(searchRoute.instance(), 'getLocation');
    searchRoute.instance().getLocation();
    expect(searchRoute.find('button.btn')).toHaveLength(1);

});
