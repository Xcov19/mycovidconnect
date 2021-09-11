import React from "react";
import ReactDOM from "react-dom";
import LoginButton from '../components/LoginButton';
import { mocked } from "ts-jest/utils";
import { mount } from 'enzyme';
import { useAuth0 } from "@auth0/auth0-react";

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");

const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "google-oauth2|12345678901234",
};
const mockedUseAuth0 = mocked(useAuth0, true);

describe("Testing LoginButton component", () => {
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

    // to test if LoginButton component renders correctly
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<LoginButton>Login</LoginButton>, div)
    });

    // to test if prop renders correct text
    it("Check if button text is correct", () => {
        const props = { name: "Login" }
        const loginBtn = mount(<LoginButton {...props}></LoginButton>)
        expect(loginBtn.text().includes('Login')).toBe(true);
    })

});