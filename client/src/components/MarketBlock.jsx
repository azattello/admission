import React from "react";
import './css/marketBlock.css';
import MarketHeader from './marketHeader'
import MarketCards from './marketCards'

const MarketBlock = () => {
   

    return (
        <div className="market-wrapper">
           <div className="main-block">

            <MarketHeader/>
            <MarketCards/>
           </div>
            
        </div>
  
    )
}

export default MarketBlock;