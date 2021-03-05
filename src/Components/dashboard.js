import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import DetailA from "./Detail-A";
import RegistrationA from "./Registration-A";

import DetailB from "./Detail-B";
import RegistrationB from "./Registration-B";
import { Redirect } from 'react-router-dom';

const Dashboard = () => {

    const [registration, setRegistration] = useState(false);
    const [detail, setDetail] = useState(true);
    const [registrationB, setRegistrationB] = useState(false);
    const [detailB, setDetailB] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
  
    const handleChangeSection = (e) => {
        const sectionTitle = e.target.textContent;
        if(sectionTitle=="PA Registration"){
            setRegistration(true);
            setDetail(false);
            setRegistrationB(false);
            setDetailB(false);
        }
        else if(sectionTitle=="PA Detail"){
            setDetail(true);
            setRegistration(false);
            setRegistrationB(false);
            setDetailB(false);
        }else if(sectionTitle=="PB Registration"){
            setRegistrationB(true);
            setDetailB(false);
            setDetail(false);
            setRegistration(false);
        }
        else if(sectionTitle=="PB Detail"){
            setDetailB(true);
            setRegistrationB(false);
            setDetail(false);
            setRegistration(false);
        }
      };
    
    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block  sidebar collapse">
                    <div className="position-sticky pt-3">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                    <a className="" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Plan A
                                    </a>
                                </h6>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ul className="nav flex-column mb-2">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" onClick={handleChangeSection}>
                                           PA Detail
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" onClick={handleChangeSection}>
                                           PA Registration
                                        </a>
                                        </li>
                                        
                                        
                                    </ul>

                                </Card.Body>
                            </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                        <a className="" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            Plan B
                                        </a>
                                    </h6>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                        <ul className="nav flex-column mb-2">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" onClick={handleChangeSection}>
                                          PB Detail
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" onClick={handleChangeSection}>
                                           PB Registration
                                            </a>
                                        </li>
                                       
                                       
                                    </ul>

                                        </Card.Body>
                                    </Accordion.Collapse>
                            </Accordion>

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
                        {registration?<RegistrationA/>:null}
                        {detail?<DetailA/>:null}
                        {registrationB?<RegistrationB/>:null}
                        {detailB?<DetailB/>:null}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;