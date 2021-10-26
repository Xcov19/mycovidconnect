import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton';

const Login = () => {

    const { logout, user, isAuthenticated, isLoading } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const drop = React.useRef(null);
    const history = useHistory();
    /**
     *
     * Dropdown click handler
     * @param {*} e
     */
    function handleClick(e) {
        if (drop && drop.current && drop.current.className) {
            if (!e.target.closest(`.${drop.current.className}`) && open) {
                setOpen(false);
            }
        }
    }
    
    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
    return (
        <div>
            {
                isAuthenticated && (
                    <div>
                        <div
                            className="dropdown"
                            ref={drop}>
                            <div className="avatar-btn"
                                onClick={() => setOpen(open => !open)} >
                                <p data-testid="welcome" className="fs-22 text-c-primary fw-med mr-30">Welcome, {user?.given_name}</p>
                                <img className="avatar" src={user.picture} alt="avatar" />
                            </div>
                            {open && (
                                <div className="avatar-drop h-auto w-56 absolute">
                                    <ul className="list-group">
                                        <li className="list-group-item" data-testid="myProfile"
                                        onClick={()=> {return history.push("/profile")}}>
                                            My Profile
                                            </li>
                                        <li className="list-group-item"
                                            onClick={() => logout({ returnTo: window.location.origin })}> Log Out</li>
                                    </ul>
                                </div>)
                            }
                        </div>
                    </div>
                )
            }
            {
                !isAuthenticated && !isLoading && (
                    <div>
                        <LoginButton name={'Log In/ Sign Up'}/>
                    </div>
                )
            }



        </div>
    );
};

export default Login;
