import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import './styles/home.css';
import HeaderClient from "../components/HeaderClient"
// import { useSelector } from "react-redux";
// import config from "../config";
import Login from "../components/Login"
import Registration from "../components/Registration"
import { useTranslation } from 'react-i18next';
import lang from "../assets/img/earth-outline.svg"




const Home = () => {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false); // Состояние для управления видимостью меню языков
    const [isFadingOut, setIsFadingOut] = useState(false); // Состояние для отслеживания анимации исчезновения
    const { t, i18n } = useTranslation();


    // Доступные языки
    const availableLanguages = ['ru', 'kz', 'en'];
  
    // Исключаем текущий язык
    const filteredLanguages = availableLanguages.filter((lng) => lng !== i18n.language);

    // const isAuth = useSelector(state => state.user.isAuth)
    const [login, setLogin] = useState(false);
    const [reg, setReg] = useState(false);

    // Функция для установки Login
    const handleLogin = () => {
        setLogin(true);
        
        setReg(false);
    };

    // Функция для установки Login
    const handleReg = () => {
        setReg(true);
        setLogin(false);

    };

      
    // Функция для установки Main
    const handleMain = () => {
        setLogin(false);
        setReg(false);

    };

    // Функция для открытия меню
    const openLangMenu = () => {
        setIsFadingOut(false);
        setIsLangMenuOpen(true);
    };
    
     // Функция для закрытия меню с анимацией исчезновения
     const closeLangMenu = () => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLangMenuOpen(false);
          setIsFadingOut(false);
        }, 200); // Время должно совпадать с продолжительностью анимации
      };

          // Функция для переключения языка
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng); // Сохраняем выбранный язык в localStorage
        closeLangMenu(); // Закрываем меню после выбора языка
      };

    return (
        <div className="wrapper">
            <HeaderClient onLoginClick={handleLogin} onMainClick={handleMain} onRegClick={handleReg}/>
            
            <div className="lang-container lang-container-home">
            <button
                className="lang-header"
                onClick={() => (isLangMenuOpen ? closeLangMenu() : openLangMenu())}
            >
                <img src={lang} alt="" />
                <p>{i18n.language.toUpperCase()}</p>
            </button>
            {isLangMenuOpen && (
                <div className={`lang-menu ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                {filteredLanguages.map((lng) => (
                    <button key={lng} onClick={() => changeLanguage(lng)}>
                    {lng.toUpperCase()}
                    </button>
                ))}
                </div>
            )}
            </div>

            {login && (
                <Login onRegClick={handleReg}/>
            )}
            {reg && (
                <Registration onLoginClick={handleLogin}/>
            )}
            
            {!login && !reg && (
                <div className="home-block">
                    <div>
                    {t('welcome_message')}
                    </div>
                    <p>
                        Пройдите регистрацию, подайте заявку онлайн.
                    </p>
                    <button onClick={handleReg}>
                        Подать заявку онлайн →
                    </button>
                    

                </div>
            )}

        </div>
  
    )
}

export default Home;