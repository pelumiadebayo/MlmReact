import React, { useState, useEffect } from "react";
import PlanADataService from "../services/planA.service";
import { useSelector } from "react-redux";


const HistoryA = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    const [planAs, setPlanAs] = useState([]);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    // const [searchTitle, setSearchTitle] = useState("");
    const initialPlanAState = {
        id: null,
        amountPaid: "",
        PaymentEvidence: "",
        verified: null,
        approvdBy: "",
        isDisapproved: "",
        payerName: "",
        accountDetailOfPayer:"" ,
        dateOfPayment :"",
        PaymentEvidence :"",
        verifiedBy :"",
        verificationDate:"", 
        Level :0,
        downlineCount :0,
        uplineId :"",
        L2UplineId  :"",
        L3UplineId  :"",
        L4UplineId :"",
        L5UplineId:""
      };
      const [plan, setPlanA] = useState(initialPlanAState);
    useEffect(() => {
        retrievePlanAs();
    }, []);

    // const onChangeSearchTitle = e => {
    //   const searchTitle = e.target.value;
    //   setSearchTitle(searchTitle);
    // };

    const retrievePlanAs = () => {
        PlanADataService.getAll()
            .then(response => {
                setPlanAs(response.data);
                console.log(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };
   
    const approvePlanA = (id)=>{
        PlanADataService.get(id)
        .then(response => {
            setPlanA({
                id: response.data.id,
                amountPaid: response.data.amountPaid,
                PaymentEvidence: response.data.PaymentEvidence,
                verified: true,
                isDisapproved: response.data.isDisapproved,
                payerName: response.data.payerName,
                accountDetailOfPayer:response.data.accountDetailOfPayer,
                dateOfPayment : response.data.dateOfPayment ,
                verifiedBy :currentUser.username,
                verificationDate: new Date(), 
                Level :0,
                downlineCount :0,
                uplineId: response.data.uplineId,
                L2UplineId: response.data.L2UplineId,
                L3UplineId: response.data.L3UplineId,
                L4UplineId: response.data.L4UplineId,
                L5UplineId: response.data.uplineId
            });
            PlanADataService.update(id, plan)
            .then(response => {
                console.log(response.data);
            })
        })
        .catch(e => {
            console.log(e);
        });
               
    }
    const setApproved=()=>{
        var element1 = document.getElementById("aprrove");
        var element2 = document.getElementById("awaiting");

        element1.classList.add("show");
        element1.classList.add("active");

        element2.classList.remove("show");
        element2.classList.remove("active");

    }
    const setAwaiting=()=>{
        var element1 = document.getElementById("aprrove");
        var element2 = document.getElementById("awaiting");
        element2.classList.add("show");
        element2.classList.add("active");

        element1.classList.remove("show");
        element1.classList.remove("active");
        element1.classList.remove("btn-info");

    }
    return (
        <div className="container">
            
         <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="approved-tab" onClick={setApproved} data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Awaiting Approval</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="awaiting-tab" onClick={setAwaiting} data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Approved</button>
            </li>
            </ul>
            <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="aprrove" role="tabpanel" aria-labelledby="home-tab">
            <h2>New Registration Awaiting aprroval</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>plan Id</th>
                            <th>Payment Evidence</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planAs &&
                            planAs.flatMap((item, index) => 
                            item.verified?
                            (
                                
                                <tr>
                            <td>{index}</td>
                            <td>{item.id}</td>
                            <td>{item.PaymentEvidence}</td>
                            <td>{item.amountPaid}</td>
                            <td>{!item.verified&&<button className="btn btn-secondary" onClick={(approvePlanA(item.id))}>Approve</button>}</td>
                        </tr>
                              
                            ):null)}
                        
                    </tbody>
                </table>
            </div>
            

            </div>
            <div class="tab-pane fade" id="awaiting" role="tabpanel" aria-labelledby="profile-tab">
            <h2>Plan A History</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>plan Id</th>
                            <th>Payment Evidence</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Approved  By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planAs &&
                            planAs.map((item, index) => (
                                <tr>
                            <td>{index}</td>
                            <td>{item.id}</td>
                            <td>{item.PaymentEvidence}</td>
                            <td>{item.amountPaid}</td>
                            <td>{item.verified==null?<p>Awaitng Approval</p>:<p>Verified</p>}</td>
                            <th>{item.approvdBy}</th>
                            <td>{!item.verified&&<button className="btn btn-secondary" onClick={(approvePlanA(item.id))}>Approve</button>}
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Detail</button>
                            </td>
                        </tr>
                              
                            ))}
                        
                    </tbody>
                </table>
            </div>
            

            </div>
            </div>
       
{/* Modal */}
<div class="modal fade show" style={{display: "block", paddingRight: "15px"}} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...Arise
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default HistoryA;