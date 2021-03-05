import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import DetailA from "./Detail-A";
import RegistrationA from "./Registration-A";
import RegisterAdmin from "./RegisterAdmin";
import PlanAHistory from "./History-A";
import PlanBHistory from "./History-B";

import RegistrationB from "./Registration-B";
import { Redirect } from 'react-router-dom';

const Dashboard = () => {

    const [registration, setRegistration] = useState(false);
    const [planA, setPlanA] = useState(true);
    const [planB, setPlanB] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
  
    const handleChangeSection = (e) => {
        const sectionTitle = e.target.textContent;
        if(sectionTitle=="Register Admin"){
            setRegistration(true);
            setPlanA(false);
            setPlanB(false);
        }
        else if(sectionTitle=="Plan A"){
            setPlanA(true);
            setRegistration(false);
            setPlanB(false);
        }else if(sectionTitle=="Plan B"){
            setPlanB(true);
            setPlanA(false);
            setRegistration(false);
        }
      };
    
    return (
        <div className="container-fluid">
            <div className="row">
            <nav id="sidebarMenu" className="bg-gray col-md-3 col-lg-2 d-md-block  sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item">
                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 ">
                                    <a onClick={handleChangeSection} data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Register Admin
                                    </a>
                                </h6>
                            </li>
                            <li className="nav-item">
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 ">
                                    <a onClick={handleChangeSection} data-bs-toggle="collapse"  role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Plan A
                                    </a>
                                </h6>
                            </li>
                            <li className="nav-item">
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
                                    <a onClick={handleChangeSection} data-bs-toggle="collapse"  role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Plan B
                                    </a>
                                </h6>
                            </li>
                        </ul>
                        <div className="collapse" id="collapseExample">

                        </div>
                    </div>
                </nav>

                <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                <span data-feather="calendar"></span>
                            This week
                            </button>
                        </div>
                    </div>

                    <div className="content">
                    {registration?<RegisterAdmin/>:null}
                        {planA?<PlanAHistory/>:null}
                        {planB?<PlanBHistory/>:null}
                        
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;