import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/authorizedMenu.css'; // Создадим отдельный файл стилей для меню

const AuthorizedMenu = () => {
  const location = useLocation(); // Хук для получения текущего адреса

  return (
    <div className="authorized-menu">
      <Link
        to="/main"
        className={`menu-item ${location.pathname === '/main' ? 'menu-item-active' : ''}`}
      >
        Главная
      </Link>
      <Link
        to="/requests"
        className={`menu-item ${location.pathname === '/requests' ? 'menu-item-active' : ''}`}
      >
        Заявки
      </Link>
      <Link
        to="/market"
        className={`menu-item ${location.pathname === '/market' ? 'menu-item-active' : ''}`}
      >
        Маркет
      </Link>
      <Link
        to="/profile"
        className={`menu-item ${location.pathname === '/profile' ? 'menu-item-active' : ''}`}
      >
        Профиль
      </Link>
    </div>
  );
};

export default AuthorizedMenu;
