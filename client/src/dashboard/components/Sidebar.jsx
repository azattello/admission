import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import "./css/structure.css";
import logo from "../../assets/img/logo-example.jpg";

const Sidebar = ({ defaultStagesOpen = false }) => {
  const [isStagesOpen, setIsStagesOpen] = useState(defaultStagesOpen);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleStages = () => setIsStagesOpen(!isStagesOpen);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Анимация раскрытия этапов приемки
  const stagesAnimation = useSpring({
    maxHeight: isStagesOpen ? 300 : 0,
    opacity: isStagesOpen ? 1 : 0,
    overflow: "hidden",
    config: { duration: 300 },
  });

  const navItems = [
    { path: "/dashboard", label: "Панель управления", icon: <HomeIcon /> },
    { path: "/dashboard/employees", label: "Сотрудники", icon: <PeopleIcon /> },
    { path: "/dashboard/students", label: "Студенты", icon: <PeopleIcon /> },
  ];

  const stageItems = [
    { path: "/dashboard/stages/personal", label: "1. Личные данные" },
    { path: "/dashboard/stages/selection", label: "2. Отбор" },
    { path: "/dashboard/stages/agreement", label: "3. Договор" },
    { path: "/dashboard/stages/payment", label: "4. Оплата" },
    { path: "/dashboard/stages/action-check", label: "5. Перевод документов" },
    { path: "/dashboard/stages/prikaz", label: "6. Приказ" },
    { path: "/dashboard/stages/visa-invitation", label: "7. Визовый блок" },
  ];

  const navItems2 = [
    { path: "/dashboard/hostel", label: "Проживание в хостеле", icon: <LocalHospitalIcon /> },
    { path: "/dashboard/market", label: "Маркет", icon: <ShoppingCartIcon /> },
    { path: "/dashboard/info-block", label: "Информационный блок", icon: <InfoIcon /> },
    { path: "/dashboard/settings", label: "Настройки", icon: <SettingsIcon /> },
  ];

  return (
    <div className={`Sidebar-wrapper ${isCollapsed ? "collapsed" : ""}`}>
      {/* Кнопка для сворачивания сайдбара */}
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        <MenuIcon />
      </button>

      {/* Логотип */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>

      <nav className="nav-main">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
            end
          >
            <div className="nav-item-content">
              {item.icon}
              <span>{!isCollapsed && item.label}</span>
            </div>
          </NavLink>
        ))}

        {/* Этапы приемки */}
        <div className="nav-item stages-toggle" onClick={toggleStages}>
          <div className="nav-item-content">
            <KeyboardArrowDownIcon className={`toggle-icon ${isStagesOpen ? "rotated" : ""}`} />
            {!isCollapsed && "Этапы приемки"}
          </div>
        </div>

        {/* Анимированный блок с этапами */}
        <animated.div style={stagesAnimation} className="stages-list">
          {stageItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
            >
              {!isCollapsed && item.label}
            </NavLink>
          ))}
        </animated.div>

        {navItems2.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
            end
          >
            <div className="nav-item-content">
              {item.icon}
              <span>
              {!isCollapsed && item.label}
              </span>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Кнопка выхода */}
      <button className="logout-button">
        <LogoutIcon /> {!isCollapsed && "Выйти"}
      </button>
    </div>
  );
};

export default Sidebar;
