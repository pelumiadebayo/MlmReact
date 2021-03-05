import React, { useState, useEffect } from "react";
import PlanbDataService from "../services/planB.service";
import ProfileDataService from "../services/profile.service";

import { useSelector } from "react-redux";

const RegistationA = props => {
  const { user: currentUser } = useSelector((state) => state.auth);

  //to find the upline id
  let uplineId;
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('uid');
  if (myParam != null) {
    uplineId = myParam;
  } else {
    uplineId = currentUser.id;
  }

  const initialplanbState = {
    amountPaid: "5500",
    uplineId: uplineId,
    PaymentEvidence: "",
    userId: currentUser.id
  };
  const initialUplineState = {
    id: "",
    username: "",
    email: "",
    dob: "",
    accountNo: "",
    bank: "",
    phoneNo: "",
    stateOfResidence: "",
    country: "",
    nextOfKin: "",
    nextOfKinPhoneNo: "",
    userId: ""

  };
  const [currentplanb, setCurrentplanb] = useState(initialplanbState);
  const [currentUpline, setCurrentUpline] = useState("");
  const [currentUserprofile, setCurrentUserprofile] = useState(initialUplineState);
  const [isRegisteredB, setIsRegisterB] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [uplineExist, setUplineExist] = useState(false);
  // const [profileComplete, setProfileComplete] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const getCurrentUpline = id => {
    ProfileDataService.getByUserId(id)
      .then(response => {
        if (response.data !== "") {
          setCurrentUpline(response.data.username);
          setIsApproved(response.data.verified)
          setUplineExist(true)
        } else {
          setCurrentUpline("user with the referal link does not exits. Please contact the link owner or you can continue to registered with no upline");
          setUplineExist(false)
        }
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getIsRegisterB = id => {
    PlanbDataService.getByUserId(id)
      .then(response => {
        if (response.data === "") {
          setIsRegisterB(false)
        } else {
          setIsRegisterB(true)
        }
        // console.log(response.data);
        //  console.log(isRegisteredB);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getCurrentUserprofile = id => {
    ProfileDataService.getByUserId(id)
      .then(response => {
        setCurrentUserprofile(response.data);
        //  console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getIsRegisterB(currentUser.id);
    getCurrentUpline(uplineId);
    getCurrentUserprofile(currentUser.id);
  }, [uplineId, currentUser.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentplanb({ ...currentplanb, [name]: value });
  };

  const saveplanb = () => {
    var data = {
      amountPaid: currentplanb.amountPaid,
      uplineId: uplineId,
      userId: currentUser.id,
      PaymentEvidence: currentplanb.PaymentEvidence
    };
// console.log(data)
    PlanbDataService.create(data)
      .then(response => {
        setCurrentplanb({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        setIsRegisterB(true)
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const newTutorial = () => {
  //   setTutorial(initialplanbState);
  //   setSubmitted(false);
  // };

  return (
    <div>
      {!isRegisteredB ? (
        <div className="edit-form">
          <h4>Plan B</h4>
          {/* here, im checking profile completion state first, and then 
          checking if the user is registering with upline link or not then
          lasting checking if the upline existed */}
          <div className="p-2 border border-warning bg-info">
            { currentUserprofile === ""  ? <strong>Kindly complete your <a className="text-muted" href="/profile">profile</a> first</strong> :
              <div >{
                currentUser.id === uplineId ?
                  <strong>You will be registered with no upline. you are starting up the ladder</strong>
                  : <div>{uplineExist ?
                    <strong>your upline is {currentUpline}</strong>
                    : <strong>{currentUpline}</strong>}</div>
              }</div>
            }
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="title">Amount to be paid</label>
              <input
                type="text"
                className="form-control"
                id="amountPaid"
                name="amountPaid"
                value={currentplanb.amountPaid}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="uplineId"
                name="uplineId"
                value={currentplanb.uplineId}
                disabled
                hidden
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="uplineId"
                name="uplineId"
                value={currentplanb.uplineId}
                disabled
                hidden
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Payment Evidence</label>
              <input
                type="text"
                className="form-control"
                id="PaymentEvidence"
                name="PaymentEvidence"
                value={currentplanb.PaymentEvidence}
                onChange={handleInputChange}
              />
            </div>
            { currentUserprofile !== "" ?
              <button onClick={saveplanb} className="btn btn-success">Submit</button> 
                :<button disabled className="btn btn-gray">Submit</button>
            }
          </form>
        </div>
      ) : (
          <div>
            <br />
            {isApproved?<p>You are a verified member of this plan</p>:<p>Your registration is awaiting verification and approval</p>}
            <hr/>

          </div>
        )}
    </div>
  );
};

export default RegistationA;