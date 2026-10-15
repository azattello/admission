import React, { useRef } from "react";
import './css/miniMarket.css';
import cardimg from '../assets/img/card-img.jpg'
import like from '../assets/icons/heart-outline.svg'
import cart from '../assets/icons/cart-outline.svg'

const MiniMarket = () => {

    const scrollRef = useRef(null); // Реф для блока прокрутки
    let isDragging = false; // Флаг для отслеживания удержания мыши
    let startX; // Начальная позиция курсора
    let scrollLeft; // Начальная позиция прокрутки

    // Начало перетаскивания
    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    // Перетаскивание
    const handleMouseMove = (e) => {
        if (!isDragging) return; // Если мышь не удерживается — ничего не делаем
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX; // Расстояние, которое перетаскивается мышь
        scrollRef.current.scrollLeft = scrollLeft - walk; // Прокрутка
    };

     // Завершение перетаскивания
     const handleMouseUp = () => {
        isDragging = false;
    };


    return(
        <div className="minimarket-main">
                <h1>Наши фирменные товары</h1>
                
                <div className="minimarket-wrapper"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Завершаем перетаскивание при выходе мыши за пределы блока
            >
                <div className="card-mini">
                    <img src={cardimg} alt="" />
                    <div className="card-content">
                        <div className="card-content-header">
                            <div className="card-title-mini">Фирменная футболка / Мерч</div>
                        </div>
                        <div className="card-content-more">
                            <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            <div className="card-title-buttons">
                                <button className="card-text-button">Заказать</button>
                                <div className="card-buttons-cart">
                                    <img src={cart} alt="" />
                                    <img src={like} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-mini">
                    <img src={cardimg} alt="" />
                    <div className="card-content">
                        <div className="card-content-header">
                            <div className="card-title-mini">Фирменная футболка / Мерч</div>
                        </div>
                        <div className="card-content-more">
                            <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            <div className="card-title-buttons">
                                <button className="card-text-button">Заказать</button>
                                <div className="card-buttons-cart">
                                    <img src={cart} alt="" />
                                    <img src={like} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-mini">
                    <img src={cardimg} alt="" />
                    <div className="card-content">
                        <div className="card-content-header">
                            <div className="card-title-mini">Фирменная футболка / Мерч</div>
                        </div>
                        <div className="card-content-more">
                            <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            <div className="card-title-buttons">
                                <button className="card-text-button">Заказать</button>
                                <div className="card-buttons-cart">
                                    <img src={cart} alt="" />
                                    <img src={like} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-mini">
                    <img src={cardimg} alt="" />
                    <div className="card-content">
                        <div className="card-content-header">
                            <div className="card-title-mini">Фирменная футболка / Мерч</div>
                        </div>
                        <div className="card-content-more">
                            <div className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                            <div className="card-title-buttons">
                                <button className="card-text-button">Заказать</button>
                                <div className="card-buttons-cart">
                                    <img src={cart} alt="" />
                                    <img src={like} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default MiniMarket;