import React from "react";
import './styles/home.css';
import HeaderClient from "../components/HeaderClient";
import TabMenu from "../components/TabMenu";
import ApplicationsBar from "../components/ApplicationsBar"
import ApplicationsBarArchive from "../components/ApplicationsBarArchive";
// import UpdatePassportForm from "../components/UpdatePassportForm"; 
// import DocumentUploader from "../components/DocumentUploader";
import Area from "../components/area"

const Requests = () => {
   

    return (
        <div className="wrapper">
            <HeaderClient />
            <div className="main-block">
            <ApplicationsBar/>
            <ApplicationsBarArchive/>
            <Area/>
            {/* <UpdatePassportForm/> */}
            {/* <DocumentUploader /> */}
            </div>
            <TabMenu/>
        </div>
  
    )
}

export default Requests;