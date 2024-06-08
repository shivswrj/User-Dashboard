import React from "react";
import {useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";

import Button from 'react-bootstrap/Button';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const infoElement = useRef();

  useEffect(() => {
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
      
  }, []);
  
  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    if(window.innerWidth <= 560){
      infoElement.current.style.display="block"
      // close.current.style.display="block"
    }
    
  };

  const hide=()=>{
    if(window.innerWidth <= 560){
      infoElement.current.style.display="none"
    }
   
  }
  const setnull=()=>{
    setSelectedUser(null)
  }
  return (
    <>
      <div className="body d-flex justify-content-center align-items-center ">
        <div className="dashboard rounded-4 d-flex  ">
          <div className="left pe-0 text-white p-3 ">
            <div className="d-flex gap-3 ps-2 align-items-center">
              <FaUsers className="uicon" />

              <h3 style={{fontSize:"1.4rem",margin:"0"}}>All Users</h3>
              {/* <p className="m-0">Scroll to get all user</p> */}
            </div>

            <div className="users-container d-flex flex-column  pointer mt-3 m  ">
              {loading ? (
                <div className="spinner">
                  <div
                    class="inner spinner-border text-light "
                    role="status"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {users.map((user, key) => (
                <div
                  className="user  align-items-center d-flex gap-3 p-2 ps-3 rounded-4"
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                >
                  <div className="pic">
                    <img
                      src={`https://randomuser.me/api/portraits/med/men/${user.id}.jpg`}
                      alt="avatar"
                    />
                    {/* <img src={user.avatar} alt="avatar" /> */}
                  </div>
                  <div className="details">
                    <h6 className="m-0">
                      {user.profile.firstName} {user.profile.lastName}
                    </h6>
                    {/* <div>
            </div> */}
                    <p className="m-0">{user.profile.username}</p>
                    <p className="m-0">{user.jobTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right rounded-3 p-3 bg-white" ref={infoElement}>
            <div className="d-flex gap-2 align-items-center">
              <RiUserSearchFill className="infoicon" />
              <h3 style={{fontSize:"1.4rem",margin:"0"}}>User Information</h3>
            </div>

            {selectedUser?
            <div className="selected-user mt-5">
                <div className="mb-2">
                    <img src={`https://randomuser.me/api/portraits/med/men/${selectedUser.id}.jpg`} alt="" srcset="" />
                </div>
                <p className="mb-1"><b>Username : </b>{selectedUser.profile.username}</p>
                <p className="mb-1"><b>Firstname : </b>{selectedUser.profile.firstName}</p>
                <p className="mb-1"><b>Lastname : </b>{selectedUser.profile.lastName}</p>
                <p className="mb-1"><b>Bio : </b>{selectedUser.Bio}</p>
                <p className="mb-1"><b>Work as a : </b>{selectedUser.jobTitle}</p>
                <p className="mb-1"><b>Email Id : </b>{selectedUser.profile.email}</p>
                <p className="mb-1"><b>Id no. : </b>{selectedUser.id}</p>
                <Button variant="primary " className="mt-2 px-3" onClick={()=>setnull()} >Close Info</Button>{' '}

            </div>:(<div className="null">
                <h5><b>No data to show</b></h5>
                <p>Click the <b>User</b> to get the their information</p>
                  <Button  variant="danger"className="mt-2 px-3 bttn"  onClick={()=>hide()}>Close</Button>
                </div>
        )}
            
          </div>
        </div>
      </div>
    </>
  );
}
