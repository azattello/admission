import React from "react";
import './styles/home.css';
import HeaderClient from "../components/HeaderClient";
import TabMenu from "../components/TabMenu";
import UserProfileStatus from "../components/UserProfileStatus"; 
import MainBlockProfile from "../components/MainBlockProfile"
import MiniApps from "../components/MiniApps"
import MiniMarket from "../components/MiniMarket"
import Area from '../components/area'


const Main = () => {
    

    return (
        <div className="wrapper">
            <HeaderClient />
            <div className="main-block">
                <UserProfileStatus />
                <MiniApps/>
                <MainBlockProfile/>
                <MiniMarket/>
            </div>
            <Area/>
            
            <TabMenu />
        </div>
    );
};

export default Main;
