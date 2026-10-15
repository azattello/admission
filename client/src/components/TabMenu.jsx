import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './css/tab.css';
import { 
  HomeOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';

const TabMenu = () => {
  const location = useLocation();

  return (
    <div className="Tab">
      {/* Главная */}
      <Link to="/main" className={`tabbutton ${location.pathname === '/main' ? 'active' : ''}`}>
        <HomeOutlined className="tab-icon" />
        <p className="tab-label">Главная</p>
        {/* {location.pathname === '/main' && <div className="active-line"></div>} */}
      </Link>

      {/* Заявки */}
      <Link to="/requests" className={`tabbutton ${location.pathname === '/requests' ? 'active' : ''}`}>
        <AppstoreOutlined className="tab-icon" />
        <p className="tab-label">Заявки</p>
        {/* {location.pathname === '/requests' && <div className="active-line"></div>} */}
      </Link>

      {/* Маркет */}
      <Link to="/market" className={`tabbutton ${location.pathname === '/market' ? 'active' : ''}`}>
        <ShoppingCartOutlined className="tab-icon" />
        <p className="tab-label">Маркет</p>
        {/* {location.pathname === '/market' && <div className="active-line"></div>} */}
      </Link>

      {/* Профиль */}
      <Link to="/profile" className={`tabbutton ${location.pathname === '/profile' ? 'active' : ''}`}>
        <UserOutlined className="tab-icon" />
        <p className="tab-label">Профиль</p>
        {/* {location.pathname === '/profile' && <div className="active-line"></div>} */}
      </Link>
    </div>
  );
};

export default TabMenu;
