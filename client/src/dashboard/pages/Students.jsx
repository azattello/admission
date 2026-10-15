import React from "react";
import "./css/dashboard.css";
import Sidebar from "../components/Sidebar";
import UsersList from "../components/UsersList";



const Students = () => {

    return (
        <div className="wrapper-admin">
          <div className="structure-admin">
            <Sidebar/>
            <main className="main-admin">
            

            <UsersList/>

            </main>
            
          </div>
        </div>
  
    )
}

export default Students;