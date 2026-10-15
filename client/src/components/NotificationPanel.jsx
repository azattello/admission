import React from 'react';
import './css/notificationPanel.css'; // Создаем CSS файл для уведомлений

const NotificationPanel = ({ isVisible, onClose }) => {
  return (
    <div className={`notification-panel ${isVisible ? 'visible' : ''}`}>
      <div className="notification-content">
        <h3>Уведомления</h3>
        {/* Пример списка уведомлений */}
        <ul>
          <li>Новое сообщение от администратора</li>
          <li>Заявка одобрена</li>
          <li>Вы получили новое предложение</li>
        </ul>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default NotificationPanel;
