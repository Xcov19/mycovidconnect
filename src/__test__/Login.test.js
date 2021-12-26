import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { mocked } from "ts-jest/utils";
import Login from '../components/Login';
import ReactDOM from 'react-dom'
import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "google-oauth2|12345678901234",
};

const mockHistoryPush = jest.fn();


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

afterEach(cleanup)

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");

const mockedUseAuth0 = mocked(useAuth0, true);

describe("Login Component Tests - Logged in", () => {
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

    // to test if Login component renders correctly
    test("Logout component renders correctly", () => {
    const div = document.createElement("div");
      ReactDOM.render(
                <Login />, div
        );
    });
  
    // to show welcome user text
    test('Showing Welcome user', () => {
      const { getByTestId } = render(<Login />); 
      expect(getByTestId('welcome')).toHaveTextContent(/Welcome,/i)
     });

    // to see if log out button is displayed in the dropdown
    test('Log out button is displayed', () => {
      render(<Login />); 
      fireEvent.click(screen.getByText(/Welcome/i))
      expect(screen.queryByText("Log Out")).toBeInTheDocument();
     });

    //  to test log out functionality
    test("Logout button working correctly", ()=>{
        const { 
            container
          } = render(
            <BrowserRouter>
              <Route path="/">home</Route>
              <Route path="/profile">Profile</Route>
            </BrowserRouter>
          );

          render(<Login />); 
          fireEvent.click(screen.getByText(/Welcome/i))
          expect(screen.queryByText("Log Out")).toBeInTheDocument();

          fireEvent.click(screen.getByText("Log Out"));
          expect(container).toHaveTextContent(/home/);

     })

     //  to test My Profile functionality
     test("My Profile button working correctly", ()=>{
      render(
        <BrowserRouter>
          <Route path="/">homeq</Route>
          <Route path="/profile">Profile</Route>
        </BrowserRouter>
      );
          const { getByTestId } = render(<Login />); 

          fireEvent.click(screen.getByText(/Welcome/i))
          expect(getByTestId("myProfile")).toBeInTheDocument();

          fireEvent.click(getByTestId("myProfile"));
          expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
     })
});
