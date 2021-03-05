import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import AddProfile from "./Add-Profile";
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
console.log(currentUser.roles);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
       <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> 
      {currentUser.roles[0]==="ROLE_USER"&&<AddProfile/>}
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p> */}
      
    </div>
  );
};

export default Profile;