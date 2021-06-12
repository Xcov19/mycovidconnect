import React from 'react';
import { Profile as OgProfile } from '../containers/Profile';
import { shallow } from 'enzyme';
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "ts-jest/utils";

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0, true);
const user = {
    name: "john",
    given_name: "jd",
    address: "IN",
    family_name: "doe",
    picture: "http://example.rohth.png"
}
describe("Renders Profile without crashing", ()=>{

    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            getAccessTokenWithPopup: jest.fn(),
            getAccessTokenSilently: jest.fn(),
            getIdTokenClaims: jest.fn(),
            loginWithPopup: jest.fn(),
            isLoading: false,
        });
    });

    // Tests if user name is rendered correctly
    test("Check if user name is displayed correctly ", ()=>{
   
        const profile = shallow(<OgProfile />)
        expect(profile.text().includes('john')).toBe(true);

    });

    
    // Tests if user address is rendered correctly
    test("Check if user address are displayed correctly ", ()=>{
   
        const profile = shallow(<OgProfile />)
        expect(profile.text().includes('IN')).toBe(true);

    });

    // Tests if search & nearby buttons are present
    test("Check if SearchRoute btn exists", ()=>{
   
        const profile = shallow(<OgProfile />)
        expect(profile.text().includes('SearchRoute')).toBe(true);
        expect(profile.find('SearchRoute')).toHaveLength(2);
        
    });
})
