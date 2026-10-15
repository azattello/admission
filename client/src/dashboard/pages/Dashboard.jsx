import React from "react";
import "./css/dashboard.css";
import Sidebar from "../components/Sidebar";



const Dashboard = () => {

    return (
        <div className="wrapper-admin">
          <div className="structure-admin">
            <Sidebar/>
            <main className="main-admin">
                Dashboard.jsx

            </main>
            
          </div>
        </div>
  
    )
}

export default Dashboard;