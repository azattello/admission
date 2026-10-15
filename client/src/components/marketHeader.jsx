import React from "react";
import './css/marketBlock.css';
import search from '../assets/icons/search-outline.svg'
import like from '../assets/icons/heart-outline.svg'
import cart from '../assets/icons/cart-outline.svg'


const MarketHeader = () => {
   

    return (
        <div className="market-header-wrapper">
            <div className="search-bar">
                <img src={search} alt="" />
                <input type="text" placeholder="Поиск" />
            </div>
            <div className="market-buttons">
                <img src={cart} alt="" />
                <img src={like} alt="" />
            </div>

        </div>
  
    )
}

export default MarketHeader;