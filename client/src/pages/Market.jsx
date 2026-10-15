import React from "react";
import './styles/home.css';
import HeaderClient from "../components/HeaderClient"
import TabMenu from "../components/TabMenu"
import MarketBlock from "../components/MarketBlock"

const Market = () => {



    return (
        <div className="wrapper">
            <HeaderClient />
            <MarketBlock/>

            <TabMenu/>
        </div>
  
    )
}

export default Market;