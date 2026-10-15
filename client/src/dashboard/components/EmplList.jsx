import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/css/employees.css";
import config from "../../config";

const EmplList = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
    permissions: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${config.apiUrl}/api/admin/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error("Ошибка при получении админов:", error);
      setError("Ошибка при загрузке списка администраторов");
    } finally {
      setIsLoading(false);
    }
  };

  // Открытие модального окна с данными сотрудника
  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      surname: admin.surname,
      email: admin.email,
      phone: admin.phone || "",
      role: admin.role,
      permissions: admin.permissions ? admin.permissions.join(", ") : "",
    });
    setModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setModalOpen(false);
    setSelectedAdmin(null);
  };

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Обновление данных сотрудника
  const updateAdmin = async () => {
    if (!selectedAdmin) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `${config.apiUrl}/api/admin/update-admin/${selectedAdmin._id}`,
        {
          ...formData,
          permissions: formData.permissions.split(",").map((p) => p.trim()), // Преобразуем строку в массив
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Данные сотрудника успешно обновлены!");
      closeModal();
      fetchAdmins(); // Обновить список
    } catch (error) {
      console.error("Ошибка при обновлении данных администратора:", error);
      alert(error.response?.data?.message || "Ошибка при обновлении");
    }
  };

  return (
    <div className="div">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Роль</th>
                <th>Права</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin._id} onClick={() => openModal(admin)} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{admin.name} {admin.surname}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone || "Не указано"}</td>
                  <td>{admin.role}</td>
                  <td>{admin.permissions.length ? admin.permissions.join(", ") : "Нет прав"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Редактирование сотрудника</h2>
            <label>Имя:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>Фамилия:</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>Телефон:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

            <label>Роль:</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} />

            <label>Права (через запятую):</label>
            <input type="text" name="permissions" value={formData.permissions} onChange={handleChange} />

            <div className="modal-buttons">
              <button onClick={updateAdmin} className="save-btn">Сохранить</button>
              <button onClick={closeModal} className="close-btn">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmplList;
