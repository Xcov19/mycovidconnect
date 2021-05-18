import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Login = () => {

    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    const [open, setOpen] = React.useState(false);
    const drop = React.useRef(null);
    function handleClick(e) {
        if(drop && drop.current && drop.current.className){
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
      ref={drop}
      style={{
        position: "relative",
        margin: "16px",
        width: "auto",
        display: "inline-block"
      }}
    >
                        <div className="avatar-btn"
                        onClick={() => setOpen(open => !open)} >
                        <img className="avatar" src={user.picture} alt={user.name} />
                        <p>{user.name}</p>
                        </div>
                      {open &&( 
                      <div className="avatar-drop h-auto w-56 absolute">
                          <ul className="list-group">
                              <li className="list-group-item">
                              <Link to="/profile">My Profile</Link></li>
                              <li  className="list-group-item"
                              onClick={() => logout({ returnTo: window.location.origin })}> Log Out</li>
                          </ul>
                   </div>)
                      }
                      </div>                        
                    </div>
                )
            }
            {
                !isAuthenticated && !isLoading &&(
                    <div>
                        <button className="btn btn-outline-primary" onClick={() => loginWithRedirect()}>Log In</button>
                        <button
                            className="btn btn-primary btn-block ml-96"
                            onClick={() =>
                                loginWithRedirect({
                                    screen_hint: "signup",
                                })
                            }
                        >Sign Up
                   </button>
                    </div>
                )
            }



        </div>
    );
};

export default Login;
