import React, { useState, useEffect } from "react";
import UserDataService from "../services/user.service";

import UserService from "../services/user.service";

const HistoryA = () => {
    const [planAs, setPlanAs] = useState([]);
    // const [currentTutorial, setCurrentTutorial] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    // const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrievePlanAs();
    }, []);

    // const onChangeSearchTitle = e => {
    //   const searchTitle = e.target.value;
    //   setSearchTitle(searchTitle);
    // };

    const retrievePlanAs = () => {
        UserDataService.getAll()
            .then(response => {
                setPlanAs(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div className="container">
            
            <h2>A History</h2>
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
                        {planAs &&
                            planAs.map((tutorial, index) => (
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

export default HistoryA;