import React from "react";
import './css/mainBlockProfile.css'
import ava from '../assets/img/ava.jpg'
import arrow from '../assets/icons/arrow-forward-circle-outline.svg'

const MainBlockProfile = () => {

    return(
        <div className="miniprofile-user-wrapper">
            <div className="miniprofile-user">
                <div className="profile-ava-container ">
                    <img src={ava} alt="" className="ava-mini " />
                </div>
                <div className="mainInfo-profile">
                    <div className="fio-mini">Абдыкали Азат Русланулы</div>
                    <p>azat04marvel@gmail.com</p>
                    <p>87478649337</p>
                    <p>040103501820</p>
                </div>
            </div>
            <div className="arrow-block">
                {/* <img src={arrow} alt="" /> */}
            </div>

        </div>
    )



}

export default MainBlockProfile;