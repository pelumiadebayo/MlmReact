import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileDataService from "../services/profile.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const AddProfile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const initialProfileState = {
    id: null,
    username: currentUser.username,
    email: currentUser.email,
    dob: "",
    accountNo: "",
    accountName: "",
    address: "",
    bank: "",
    phoneNo: "",
    stateOfResidence: "",
    country: "",
    nextOfKin: "",
    nextOfKinPhoneNo: ""
  };
  const [profile, setProfile] = useState(initialProfileState);
  const [submitted, setSubmitted] = useState(false);
  const [isEditView, setIsEditView] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const getProfile = id => {
    ProfileDataService.getByUserId(id)
      .then(response => {
        setProfile(response.data);
        if(response.data==""){
          setSubmitted(false);
        }else{
          setSubmitted(true);
        }
        // console.log(response.data);

      }).catch(e => {
        console.log(e);
      });
  }


  const saveProfile = () => {
    let dob;
    if(profile.dob!=null){
      dob = profile.dob.toString();
    }
    var data = {
      username: currentUser.username,
      email: currentUser.email,
      dob: dob,
      accountNo: profile.accountNo,
      bank: profile.bank,
      accountName: profile.accountName,
      address: profile.address,
      phoneNo: profile.phoneNo,
      stateOfResidence: profile.stateOfResidence,
      country: profile.country,
      nextOfKin: profile.nextOfKin,
      nextOfKinPhoneNo: profile.nextOfKinPhoneNo,
      userId: currentUser.id
    };
    console.log(data)
    ProfileDataService.create(data)
      .then(response => {
        setProfile(response.data);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProfile(currentUser.id)
  }, [currentUser.id]);

  const getEditView = () => {
    setIsEditView(true);
  };

  const editProfile = () => {
    ProfileDataService.update(profile.id, profile)
    .then(response => {
      console.log(response.data);
      setIsEditView(false);

      // setMessage("The profile was updated successfully!");
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (

    <div className="col-md-12 ">
      

      <div className="card ">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        {isEditView?
         (
         <div>
           <div className="row">
         <div className="col-md-6">
           <div className="form-group ">
             <input
               placeholder="Name" required
               type="text"
               className="form-control"
               name="username"
               value={currentUser.username}
               onChange={handleInputChange}
              //  validations={[required]}
               disabled
             />
           </div>

           <div className="form-group">
             <input
               placeholder="Your email address"
               type="text"
               className="form-control"
               name="email"
               value={currentUser.email}
               onChange={handleInputChange}
              //  validations={[required]}
               disabled
             />
           </div>

           <div className="form-group">
             <input
               placeholder="phone Number"
               type="text"
               className="form-control"
               name="phoneNo"
               value={profile.phoneNo}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="Date of birth"
               type="date"
               className="form-control"
               name="dob"
               value={profile.dob}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="Address"
               type="text"
               className="form-control"
               name="address"
               value={profile.address}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="State of Residence"
               type="text"
               className="form-control"
               name="stateOfResidence"
               value={profile.stateOfResidence}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
           </div>
           <div className="col-md-6">
           <div className="form-group ">
             <input
               placeholder="Couhtry"
               type="text"
               className="form-control"
               name="country"
               value={profile.country}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>

           <div className="form-group">
             <input
               placeholder="Account Number"
               type="text"
               className="form-control"
               name="accountNo"
               value={profile.accountNo}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="Account Name"
               type="text"
               className="form-control"
               name="accountName"
               value={profile.accountName}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="bank"
               type="text"
               className="form-control"
               name="bank"
               value={profile.bank}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div><div className="form-group">
             <input
               placeholder="Next Of Kin"
               type="text"
               className="form-control"
               name="nextOfKin"
               value={profile.nextOfKin}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div><div className="form-group">
             <input
               placeholder="Next of kin Phone Number"
               type="text"
               className="form-control"
               name="nextOfKinPhoneNo"
               value={profile.nextOfKinPhoneNo}
               onChange={handleInputChange}
             //validations={[required]}
             />
           </div>
         </div>
       </div>
       <button onClick={editProfile} className="btn btn-info">
       submit
        </button>
     </div>
       ):

       <div>{submitted ? 
        (
          <div className="row p-3">
            <h4 >You are good to go!</h4>
            <a className="btn btn-success m-2" href="/dashboard">
              Register for plans
            </a>
            <a className="btn btn-info m-2" onClick={getEditView}>edit</a>
          </div>
        ):<h4>Kindly complete your profile here.</h4>
        }
        {submitted?
        (
         <div className="row">
         <div className="col-md-6">
           <div className="form-group ">
             <input
               placeholder="Name" required
               type="text"
               className="form-control"
               name="username"
               value={currentUser.username}
               onChange={handleInputChange}
              //  validations={[required]}
               disabled
             />
           </div>

           <div className="form-group">
             <input
               placeholder="Your email address"
               type="text"
               className="form-control"
               name="email"
               value={currentUser.email}
               onChange={handleInputChange}
              //  validations={[required]}
               disabled
             />
           </div>

           <div className="form-group">
             <input
               placeholder="phone Number"
               type="text"
               className="form-control"
               name="phoneNo"
               value={profile.phoneNo}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="Date of birth"
               type="date"
               className="form-control"
               name="dob"
               value={profile.dob}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="Address"
               type="text"
               className="form-control"
               name="address"
               value={profile.address}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="State of Residence"
               type="text"
               className="form-control"
               name="stateOfResidence"
               value={profile.stateOfResidence}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>
           </div>
           <div className="col-md-6">
           <div className="form-group ">
             <input
               placeholder="Country"
               type="text"
               className="form-control"
               name="country"
               value={profile.country}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>

           <div className="form-group">
             <input
               placeholder="Account Number"
               type="text"
               className="form-control"
               name="accountNo"
               value={profile.accountNo}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="Account Name"
               type="text"
               className="form-control"
               name="accountName"
               value={profile.accountName}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div>
           <div className="form-group">
             <input
               placeholder="bank"
               type="text"
               className="form-control"
               name="bank"
               value={profile.bank}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div><div className="form-group">
             <input
               placeholder="Next Of Kin"
               type="text"
               className="form-control"
               name="nextOfKin"
               value={profile.nextOfKin}
               onChange={handleInputChange}
               disabled
             //validations={[required]}
             />
           </div><div className="form-group">
             <input
               placeholder="Next of kin Phone Number"
               type="text"
               className="form-control"
               name="nextOfKinPhoneNo"
               value={profile.nextOfKinPhoneNo}
               onChange={handleInputChange}
             //validations={[required]}
             disabled
             />
           </div>
         </div>
       </div>):
        (
          <div className="row">
          <div className="col-md-6">
            <div className="form-group ">
              <input
                placeholder="Name" required
                type="text"
                className="form-control"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                // validations={[required]}
                disabled
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Your email address"
                type="text"
                className="form-control"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                // validations={[required]}
                disabled
              />
            </div>

            <div className="form-group">
              <input
                placeholder="phone Number"
                type="text"
                className="form-control"
                name="phoneNo"
                value={profile.phoneNo}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Date of birth"
                type="date"
                className="form-control"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Address"
                type="text"
                className="form-control"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="State of Residence"
                type="text"
                className="form-control"
                name="stateOfResidence"
                value={profile.stateOfResidence}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group ">
              <input
                placeholder="Couhtry"
                type="text"
                className="form-control"
                name="country"
                value={profile.country}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Account Number"
                type="text"
                className="form-control"
                name="accountNo"
                value={profile.accountNo}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Account Name"
                type="text"
                className="form-control"
                name="accountName"
                value={profile.accountName}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="bank"
                type="text"
                className="form-control"
                name="bank"
                value={profile.bank}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div><div className="form-group">
              <input
                placeholder="Next Of Kin"
                type="text"
                className="form-control"
                name="nextOfKin"
                value={profile.nextOfKin}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div><div className="form-group">
              <input
                placeholder="Next of kin Phone Number"
                type="text"
                className="form-control"
                name="nextOfKinPhoneNo"
                value={profile.nextOfKinPhoneNo}
                onChange={handleInputChange}
              //validations={[required]}
              />
            </div>
          </div>
        </div>
        )
        }
        {!submitted&&<button onClick={saveProfile} className="btn btn-success">
            save
          </button>
        }</div>
        }


      </div>
    </div>

  );
};

export default AddProfile;