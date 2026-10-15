import React, { useState } from "react";
import "./css/dataProfile.css"; // Добавьте стили для табов

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "documents":
      return <div>Здесь форма загрузки документов</div>;
    case "photo":
      return <div>Здесь форма загрузки фото 3x4</div>;
    case "status":
      return <div>Здесь статус документов</div>;
    default:
      return <div>Выберите вкладку.</div>;
  }
};

const DataProfile = () => {
  const [activeTab, setActiveTab] = useState("documents"); // Вкладка по умолчанию

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => handleTabClick("documents")}
        >
          Мои данные
        </button>
        <button
          className={`tab-button ${activeTab === "photo" ? "active" : ""}`}
          onClick={() => handleTabClick("photo")}
        >
          Документы
        </button>
        <button
          className={`tab-button ${activeTab === "status" ? "active" : ""}`}
          onClick={() => handleTabClick("status")}
        >
          Статус
        </button>
      </div>

      <div className="tab-content">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default DataProfile;
