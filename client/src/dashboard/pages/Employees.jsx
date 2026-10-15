import React, { useState } from "react";
import axios from "axios";
import "./css/employees.css";
import Sidebar from "../components/Sidebar";
import config from "../../config"
import EmplList from "../components/EmplList";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    phone: "",
    role: "admin",
    permissions: [],
  });

  const permissionsList = [
    { label: "Управление пользователями", value: "manageUsers" },
    { label: "Просмотр отчетов", value: "viewReports" },
    { label: "Управление контентом", value: "manageContent" },
    { label: "Управление настройками", value: "manageSettings" },
    { label: "Личные данные", value: "approvePersonalData" },
    { label: "Отбор", value: "approveSelection" },
    { label: "Договор", value: "approveContract" },
    { label: "Оплата", value: "approvePayment" },
    { label: "Перевод документов", value: "approveDocsTransfer" },
    { label: "Приказ", value: "approveOrder" },
    { label: "Визовый блок", value: "approveVisa" },
  ];


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: checked
          ? [...prev.permissions, value]
          : prev.permissions.filter((perm) => perm !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminToken = localStorage.getItem("adminToken");

    // Проверка на наличие токена
    if (!adminToken) {
      console.error("Ошибка: adminToken не найден в localStorage");
      return;
    }

      await axios.post(`${config.apiUrl}/api/admin/create-admin`, formData, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      
      setIsModalOpen(false);
      setFormData({
        email: "",
        name: "",
        surname: "",
        password: "",
        phone: "",
        role: "admin",
        permissions: [],
      });
    } catch (error) {
      console.error("Ошибка при добавлении админа:", error);
    }
  };

  return (
    <div className="wrapper-admin">
      <div className="structure-admin">
        <Sidebar />
        <main className="main-admin">
          <header className="header-empl">
            <p>Сотрудники</p>
            <div className="add-empl" onClick={() => setIsModalOpen(true)}>
              Добавить сотрудника +
            </div>
          </header>

          <EmplList/>         

          {isModalOpen && (
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
              <div className="modal-container-empl" onClick={(e) => e.stopPropagation()}>
                <h2>Добавить сотрудника</h2>
                <form className="modal-form">
                  <div className="form-inputs-empl">

                  <label className="modal-form-label">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="modal-form-label">
                    Имя:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="modal-form-label">
                    Фамилия:
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      />
                  </label>
                  <label className="modal-form-label">
                    Пароль:
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      />
                  </label>
                  <label className="modal-form-label">
                    Телефон:
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="modal-form-label">
                    Роль:
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      >
                      <option value="admin">Администратор</option>
                      <option value="superadmin">Суперадминистратор</option>
                    </select>
                  </label>
                    </div>

                  <fieldset className="permissions-admin">
                    <div className="permissionsList">
                      {permissionsList.map((perm) => (
                        <label key={perm.value} className="checkbox-empl-label-admin">
                          <input
                            type="checkbox"
                            name="permissions"
                            value={perm.value}
                            checked={formData.permissions.includes(perm.value)}
                            onChange={handleChange}
                            className="checkbox-empl"
                          />
                          <span className="checkbox-label">
                          {perm.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  
               </form>
               <div className="modal-actions">
                  <button type="submit" className="submit-button" onClick={handleSubmit}>
                    Сохранить
                  </button>
                  <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
                    Отмена
                  </button>
                </div>
        
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Employees;
