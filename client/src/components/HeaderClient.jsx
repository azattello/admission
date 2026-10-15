import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import './css/components.css';
import logo from "../assets/img/logo-example.jpg"
// import { useSelector } from "react-redux";
import config from "../config";
import lang from "../assets/img/earth-outline.svg"
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import AuthorizedMenu from './AuthorizedMenu'; // Импортируем наш новый компонент
import NotificationPanel from './NotificationPanel'; // Импортируем компонент уведомлений
import { BellOutlined, BellFilled } from '@ant-design/icons';

const HeaderClient = ({ onLoginClick, onMainClick, onRegClick }) => {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false); // Состояние для управления видимостью меню языков
    const [isFadingOut, setIsFadingOut] = useState(false); // Состояние для отслеживания анимации исчезновения
    const [isNotificationVisible, setIsNotificationVisible] = useState(false); // Состояние для видимости уведомлений
    const { t, i18n } = useTranslation();

    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    // Доступные языки
    const availableLanguages = ['ru', 'kz', 'en'];
  
    // Исключаем текущий язык
    const filteredLanguages = availableLanguages.filter((lng) => lng !== i18n.language);
  
    // Функция для переключения языка
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng); // Сохраняем выбранный язык в localStorage
      closeLangMenu(); // Закрываем меню после выбора языка
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
  
     // Функция для выхода из аккаунта
     const handleLogout = () => {
      dispatch(logout());
    };


    // Функция для открытия и закрытия окна уведомлений
    const toggleNotifications = () => {
      setIsNotificationVisible(!isNotificationVisible);
    };



    return (
      <div className="header-client-visit">
        <button className="logo-header" onClick={onMainClick}>
          <img src={logo} alt="" />
          <p>{config.companyName}</p>
        </button>
        
        {isAuth && <AuthorizedMenu />}


        <div className="buttons-header">

          <div className="lang-container">
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

          {/* Если пользователь не авторизован, показываем кнопки "Вход" и "Регистрация" */}
          {!isAuth ? (
            <>
              <button className="auth-header-button" onClick={onLoginClick}>
                {t('login')}
              </button>
              <button className="reg-header-button" onClick={onRegClick}>
                {t('register')}
              </button>
            </>
          ) : (
            <>
            <button className="notification-button" onClick={toggleNotifications}>
              {isNotificationVisible ? (
                <BellFilled className="notification-icon"/>
              ) : (
                <BellOutlined className="notification-icon"/>
              )}
            </button>
            <button className="logout-header-button reg-header-button" onClick={handleLogout}>
              {t('logout')}
            </button>
            </>
          )}
          
         
        </div>

         {/* Компонент уведомлений */}
         {isNotificationVisible && (
            <NotificationPanel
              isVisible={isNotificationVisible}
              onClose={toggleNotifications}
            />
          )}
      </div>
    );
  };
  
  export default HeaderClient;