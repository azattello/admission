import React from "react";
import './css/marketBlock.css';
import cardimg from '../assets/img/card-img.jpg'
import like from '../assets/icons/heart-outline.svg'
import cart from '../assets/icons/cart-outline.svg'
import Area from './area.jsx'

const MarketCards = () => {
   

    return (
        <div className="market-cards-wrapper">
            <div className="card">
                <img src={cardimg} className="cards-image"  alt="" />
                <div className="card-content">
                    <div className="card-content-header">
                        <div className="card-title">Фирменная футболка / Мерч</div>
                    </div>
                    <div className="card-content-more">
                        <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, vitae excepturi unde deserunt magni ipsa.</div>
                        <div className="card-title-buttons">
                            <button className="card-text-button">Заказать</button>
                            <div className="card-buttons-cart">
                                <img src={cart} alt="" />
                                <img src={like}  alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <img src={cardimg} className="cards-image"  alt="" />
                <div className="card-content">
                    <div className="card-content-header">
                        <div className="card-title">Фирменная футболка / Мерч</div>
                    </div>
                    <div className="card-content-more">
                        <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, vitae excepturi unde deserunt magni ipsa.</div>
                        <div className="card-title-buttons">
                            <button className="card-text-button">Заказать</button>
                            <div className="card-buttons-cart">
                                <img src={cart} alt="" />
                                <img src={like}  alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <img src={cardimg} className="cards-image"  alt="" />
                <div className="card-content">
                    <div className="card-content-header">
                        <div className="card-title">Фирменная футболка / Мерч</div>
                    </div>
                    <div className="card-content-more">
                        <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, vitae excepturi unde deserunt magni ipsa.</div>
                        <div className="card-title-buttons">
                            <button className="card-text-button">Заказать</button>
                            <div className="card-buttons-cart">
                                <img src={cart} alt="" />
                                <img src={like}  alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Area/>
        </div>  
  
    )
}

export default MarketCards;