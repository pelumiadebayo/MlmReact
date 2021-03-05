import React, { useState, useEffect } from "react";
import PlanBDataService from "../services/planB.service";


const HistoryB = () => {
    const [planBs, setPlanBs] = useState([]);

    useEffect(() => {
        retrievePlanBs();
    }, []);

   

    const retrievePlanBs = () => {
        PlanBDataService.getAll()
            .then(response => {
                setPlanBs(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div className="container">
            
            <h2>Plan B History</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>plan Id</th>
                            <th>Payment Evidence</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planBs &&
                            planBs.map((tutorial, index) => (
                                <tr>
                            <td>{index}</td>
                            <td>{tutorial.id}</td>
                            <td>{tutorial.PaymentEvidence}</td>
                            <td>{tutorial.amountPaid}</td>
                            <td>{tutorial.verified}</td>
                        </tr>
                              
                            ))}
                        
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default HistoryB;