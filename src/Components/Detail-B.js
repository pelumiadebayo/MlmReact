import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import ProfileDataService from "../services/profile.service";
import { useSelector } from "react-redux";
import { Modal, Button } from 'react-bootstrap';


const DetailB = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
    if (!currentUser) {
        return <Redirect to="/login" />;
      }
      
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const getProfile =async id => {
          console.log(id)
       await ProfileDataService.getByUserId(id)
          .then(response => {
            if (response.data=="") {
                handleShow();
                console.log(response);

              }else{
                return <Redirect to="/Registation" />;

              }
          })
          .catch(e => {
            console.log(e);
          });
      };
      const handleInputChange = () => {
        getProfile(currentUser.id);
      };

     
  return (
    <div className="container">
      <h2>Detail </h2>  
      click here to register
        <button  onClick={handleInputChange}>
        Register
        </button>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Woohoo!, You need to set your profile first</p>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" href="/profile">
            Set Profile
          </Button>
        </Modal.Footer>
      </Modal>
             
    </div>
  );
};

export default DetailB;