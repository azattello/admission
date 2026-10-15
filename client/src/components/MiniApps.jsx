import React from "react";
import './css/miniApps.css'
import arrow from '../assets/icons/arrow-forward-circle-outline.svg'
import circle from '../assets/icons/radio-button-on-outline.svg'

const MiniApps = () => {
    return(
        <div className="miniApps">
            <div className="miniApps-content">
                <div className="miniApps-title">3 невыполненных шагов</div>
                <div className="miniApps-p">
                    
                    <img src={circle} alt="" />
                    <p>Завершите регистрацию</p>
                </div>
            </div>
            <div className="arrow-block">
                {/* <img src={arrow} alt="" /> */}
            </div>
        </div>
    )
}


export default MiniApps;