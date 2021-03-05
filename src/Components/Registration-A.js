import React, { useState, useEffect } from "react";
import PlanADataService from "../services/planA.service";
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

  const initialPlanAState = {
    amountPaid: "2500",
    uplineId: uplineId,
    PaymentEvidence: "",
    payerName: "",
    accountDetailOfPayer: "",
    dateOfPayment: "",
    userId: currentUser.id,
  };

  const initialParentsState={
    L2UplineId: "",
    L3UplineId: "",
    L4UplineId: "",
    L5UplineId: "",
    L6UplineId: "",
  }
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
  const [currentPlanA, setCurrentPlanA] = useState(initialPlanAState);
  const [currentUpline, setCurrentUpline] = useState("");
  const [currentUserprofile, setCurrentUserprofile] = useState(initialUplineState);
  const [isRegisteredA, setIsRegisterA] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [uplineExist, setUplineExist] = useState(false);
  const [parentsState, setParentsState] = useState(initialParentsState);

  // const [profileComplete, setProfileComplete] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const getCurrentUpline = id => {
    ProfileDataService.getByUserId(id)
      .then(response => {
        if (response.data !== "") {
          setCurrentUpline(response.data.username);
          // console.log(response.data);
          setUplineExist(true)
        } else {
          setCurrentUpline("user with the referal link does not exits. Please contact the link owner or you can continue to registered with no upline");
          setUplineExist(false)
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getIsRegisterA = id => {
    PlanADataService.getByUserId(id)
      .then(response => {
        if (response.data === "") {
          setIsRegisterA(false);
        } else {
          setIsRegisterA(true);        
          setIsApproved(response.data.verified);

        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getCurrentUserprofile = id => {
    ProfileDataService.getByUserId(id)
      .then(response => {
        setCurrentUserprofile(response.data);
          //console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getParentsById = Id => {
    PlanADataService.getByUserId(Id)
      .then(response =>{
        if(response.data=== ""){
          setParentsState({
            L2UplineId: null,
            L3UplineId: null,
            L4UplineId: null,
            L5UplineId: null,
            L6UplineId: null,
          })
        }else{
          setParentsState({
            L2UplineId: response.data.uplineId,
            L3UplineId: response.data.L2UplineId,
            L4UplineId: response.data.L3UplineId,
            L5UplineId: response.data.L4UplineId,
            L6UplineId: response.data.L5UplineId,
          })
        }
        console.log("data: "+parentsState)
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getIsRegisterA(currentUser.id);
    getCurrentUpline(uplineId);
    getCurrentUserprofile(currentUser.id);
    getParentsById(uplineId);
  }, [uplineId, currentUser.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPlanA({ ...currentPlanA, [name]: value });
  };
  
  const savePlanA = () => {
    var planAData = {
      amountPaid: currentPlanA.amountPaid,
      userId: currentUser.id,
      payerName: currentPlanA.payerName,
      accountDetailOfPayer: currentPlanA.accountDetailOfPayer,
      dateOfPayment: currentPlanA.dateOfPayment,
      PaymentEvidence: currentPlanA.PaymentEvidence,
      uplineId: uplineId,
      L2UplineId: parentsState.L2UplineId,
      L3UplineId: parentsState.L3UplineId,
      L4UplineId: parentsState.L4UplineId,
      L5UplineId: parentsState.L5UplineId,
      L6UplineId: parentsState.L6UplineId,
    };
    
    
    PlanADataService.create(planAData)
      .then(response => {
        setCurrentPlanA({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        setIsRegisterA(true)
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const newTutorial = () => {
  //   setTutorial(initialPlanAState);
  //   setSubmitted(false);
  // };

  return (
    <div>
      {!isRegisteredA ? (
        <div className="edit-form">
          <h4>Plan A</h4>
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
                value={currentPlanA.amountPaid}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="uplineId"
                name="uplineId"
                value={currentPlanA.uplineId}
                disabled
                hidden
              />
            </div>
            <div className="form-group">
            <label htmlFor="description">Payer Name</label>
              <input
                type="text"
                className="form-control"
                id="payerName"
                name="payerName"
                value={currentPlanA.payerName}
                onChange={handleInputChange}

              />
            </div>
            <div className="form-group">
            <label htmlFor="description">Account Detail Of Payer</label>
              <input
                type="text"
                className="form-control"
                id="accountDetailOfPayer"
                name="accountDetailOfPayer"
                value={currentPlanA.accountDetailOfPayer}
                onChange={handleInputChange}

              />
            </div>
            <div className="form-group">
            <label htmlFor="description">Date and Time Of Payment</label>
              <input
                type="datetime-local"
                className="form-control"
                id="dateOfPayment"
                name="dateOfPayment"
                value={currentPlanA.dateOfPayment}
                onChange={handleInputChange}

              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Payment Evidence(Screenshot Image) optional</label>
              <input
                type="text"
                className="form-control"
                id="PaymentEvidence"
                name="PaymentEvidence"
                value={currentPlanA.PaymentEvidence}
                onChange={handleInputChange}
              />
            </div>
            { currentUserprofile !== "" ?
              <button onClick={savePlanA} className="btn btn-success">Submit</button> 
                :<button disabled className="btn btn-gray">Submit</button>
            }
          </form>
        </div>
      ) : (
          <div>
            <br />
            {isApproved?<div><p>You are a verified member of this plan</p><p>Here is your referer link</p><a>http://localhost:8081/registration?uid={currentUser.id}</a></div>:<p>Your registration is awaiting verification and approval</p>}
            <hr/>

          </div>
        )}
    </div>
  );
};

export default RegistationA;