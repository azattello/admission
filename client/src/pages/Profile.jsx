import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";

import './styles/home.css';
import HeaderClient from "../components/HeaderClient"
import TabMenu from "../components/TabMenu"
import ProfileUserBlock from "../components/ProfileUserBlock"
import DataProfile from "../components/DataProfile"
import Area from '../components/area'


const Profile = () => {
       const dispatch = useDispatch();
   
       // Функция для выхода из аккаунта
        const handleLogout = () => {
        dispatch(logout());
        };

    return (
        <div className="wrapper">
            <HeaderClient />
            <div className="main-block">
                <ProfileUserBlock />
                <DataProfile/>
                <div className="logout__main">
                    <button className="profile-logout" onClick={handleLogout}>
                    Выйти
                    </button>
                </div>
            </div>
    <Area/>

            

            <TabMenu/>
        </div>
  
    )
}

export default Profile;