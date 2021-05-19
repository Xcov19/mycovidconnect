import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Login = () => {

    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const drop = React.useRef(null);
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
                                <img className="avatar" src={user.picture} alt={user.name} />
                                <p>{user.name}</p>
                            </div>
                            {open && (
                                <div className="avatar-drop h-auto w-56 absolute">
                                    <ul className="list-group">
                                    <Link to="/profile">
                                        <li className="list-group-item">
                                            My Profile</li>
                                        </Link>
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
                        <button className="btn btn-primary" onClick={() => loginWithRedirect()}>Log In/ Sign Up</button>
                    </div>
                )
            }



        </div>
    );
};

export default Login;
