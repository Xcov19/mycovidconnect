import React, { useState } from 'react';
import MaindHOC from '../components/MainHOC';
import { useAuth0 } from "@auth0/auth0-react";
import SearchRoute from '../components/SearchRoute';

const Profile = () => {

  const { user } = useAuth0();
  const { name, picture } = user;

  const [isEdit, editForm] = useState(null);

  return (
    <div className="row m-0 d-flex">
      <div className="col-md-5 pl-0">
        <div className="profile-sec-left">
          <div className="profile-sec-1 ">
            <h3 className="fs-48 text-white fw-med mt-25">Profile</h3>
            <img className="profile-avatar" src={picture} alt="" />
            {/* TO DO: add edit button */}

            <div className="fs-29 text-white">{name}</div>
            {
              user?.address && (
                <div className="fs-12 text-white">{user?.address}</div>
              )
            }
          </div>

          <div className="profile-sec-2">
            <div className="d-flex align-items-center justify-content-md-center justify-content-sm-end mb-30">
              <div className="fs-24 fw-med text-secondary">Personal Details</div>

            </div>
            <div className="row m-0">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" disabled={!isEdit} value={user?.given_name} name="" id="" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" disabled={!isEdit} value={user?.family_name} name="" id="" />
                </div>
              </div>
            </div>
           {/* TODO: add dob, location & password fields */}
                </div>
        </div>
      </div>
      <div className="col-md-7 justify-content-center align-items-center d-none d-md-flex">
        <button className="btn btn-secondary fs-22 mr-80 p-30">Find vaccine centers nearby</button>
        <SearchRoute >
        <button className="btn btn-primary fs-22 p-30">Find hospitals nearby</button>
        </SearchRoute>
      </div> 
    </div>
  );
}
export default MaindHOC(Profile);