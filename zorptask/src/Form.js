import React, {useState } from 'react';
import axios from 'axios';
import './Form.css';

function Form() {
    const [name, setName] = useState('');
    const [accountid, setAccountid] = useState('');
    const [countrycode, setCountrycode] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [teamid, setTeamid] = useState('');
    const [teamids, setTeamids] = useState([]);
    const [role, setRole] = useState('');
    // Storing all the inputs in the piece of state.


    // This function is for storing the Team Ids in an array.
    // Single inputs are taken and then stored in TeamId array.
    const addTeamid = (e) => {
        e.preventDefault();

        // Checking if the teamid is not NULL
        if(teamid)
        {
            alert("Team Id added - " + teamid);
            let newTeamid = [...teamids, teamid];
            setTeamids(newTeamid);
            setTeamid('');
        }
        else
        {
            // Alert, if teamid is NULL
            alert("Empty Team Id");
        }
      };
    
    
    const sendMessage = (e) => {
        e.preventDefault();

        // Creating an object for a POST request
        let user = {
            "name": name,
            "accountId": accountid,
            "phone": {
                "countryCode": countrycode,
                "num": phonenum
            },
            "teamIds": teamids,
            "role": role
        }

        // Calling a helper fucntion for sending a POST request.
        // Parameter passed is the object created i.e - user.
        axiossend(user);
    }

    // This function is for sending a POST request.
    const axiossend = (user) => {

        // Creating a POST request.
        // I have tried many possible solutions to remove an error. (CORS error)
        // Possible solns - Changing the mode from CORS to No CORS, Using Proxy URL, Refactoring the headers,
        // Used one google Chrome extension also, but cannot get the correct solution to this problem.
        // Postman API test and Curl requests are working fine but I have tried many solutions and not able to debug.
        axios.post("http://65.0.17.80:8081/user", user, {
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            // Logging the response
            console.log(response);

            // Reseting the values
            setAccountid('');
            setCountrycode('');
            setName('');
            setPhonenum('');
            setRole('');
            setTeamids([]);
        })
        .catch((error) => {
            // Throwing the error.
            alert("Error");
            console.error('There was an error!', error);
        })
    }

    // Rendering the Form
    return (
        <div className="form">
                <form className="form__cont">
                    <input className="form_input" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <input className="form_input" type="text" placeholder="Account Id" value={accountid} onChange={e => setAccountid(e.target.value)} />
                    <input className="form_input" type="text" placeholder="Country Code" value={countrycode} onChange={e => setCountrycode(e.target.value)} />
                    <input className="form_input" type="text" placeholder="Phone Number" value={phonenum} onChange={e => setPhonenum(e.target.value)} />
                    <input className="form_input" type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
                    <input className="form_input" type="text" placeholder="Team Id" value={teamid} onChange={e => setTeamid(parseInt(e.target.value) || teamid)} />
                    <div className="form__button__cont">
                        <div>
                            <button className="form__button" onClick={addTeamid} >Add Team Id</button>
                            <button className="form__button" type="submit" onClick={sendMessage} >Send a Message</button>
                        </div>
                    </div>
                </form>
        </div>
    )
}

export default Form
