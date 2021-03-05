// import React, { Component } from "react";
// import { Link, Switch,Route  } from 'react-router-dom';
// import  Tutorial  from "./Components/tutorial";
// import  TutorialsList  from "./Components/tutorial-list";
// import  AddTutorial  from "./Components/add-tutorial";

// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           <a href="/tutorials" className="navbar-brand">
//             bezKoder
//           </a>
//           <div className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <Link to={"/tutorials"} className="nav-link">
//                 Tutorials
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/add"} className="nav-link">
//                 Add
//               </Link>
//             </li>
//           </div>
//         </nav>

//         <div className="container mt-3">
//           <Switch>
//             <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
//             <Route exact path="/add" component={AddTutorial} />
//             <Route path="/tutorials/:id" component={Tutorial} />
//           </Switch>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Dashboard from "./Components/dashboard";
import Profile from "./Components/Profile";
import TutorialList from "./Components/tutorial-list";
import Tutorial from "./Components/tutorial";
import AddTutorial from "./Components/add-tutorial";
import BoardUser from "./Components/BoardUser";
import BoardModerator from "./Components/BoardModerator";
import BoardAdmin from "./Components/BoardAdmin";
import Footer from "./Components/Footer";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import RegMod from "./Components/RegisterModerator";
import { history } from "./helpers/history";
import ModDashboard from "./Components/Moddashboard";
import PlanA from "./Components/History-A";
import PlanB from "./Components/History-B";
import AdminDashboard from "./Components/AdminDashboard";
const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Miltilevel
          </Link>
          <div className="navbar-nav mr-auto">
           

            {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )} */}

            {/* {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}

            {currentUser ? (
               
              <li className="nav-item">
                {/* <Link to={"/user"} className="nav-link">
                  User
                </Link> */}
                {currentUser.roles[0]==="ROLE_USER"&&<Link to={"/dashboard"} className="nav-link">
                 Dashboard
               </Link>}
                {currentUser.roles[0]==="ROLE_ADMIN"&&<Link to={"/admindashboard"} className="nav-link">
                 Admin board
               </Link>}
               {currentUser.roles[0]==="ROLE_MODERATOR"&&<Link to={"/moddashboard"} className="nav-link">
                 Moderator board
               </Link>}
              </li>
              
            ):null}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
             
              <li className="nav-item">
                <a href="" className="nav-link" >
                  Notification
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className=" mt-2">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/tutorial-list" component={TutorialList} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route exact path="/add-tutorial" component={AddTutorial} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registermod" component={RegMod} />
            <Route exact path="/moddashboard" component={ModDashboard} />
            <Route exact path="/admindashboard" component={AdminDashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route  path={"/registration"} component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/plana" component={PlanA} />
            <Route exact path="/planb" component={PlanB} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
      {(window.location.pathname !== "/dashboard" && window.location.pathname !== "/moddashboard" && window.location.pathname !== "/admindashboard") &&<Footer/>}
      {/* {window.location.pathname !== "/moddashboard" && <Footer/>} */}

    </Router>
  );
};

export default App;