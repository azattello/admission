import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COUNTRIES, FACULTIES, SPECIALTIES, LANGUAGES } from "../constants";
import "./css/passportForm.css";

const UpdatePassportForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    gender: "",
    birthDate: "",
    surname: "",
    name: "",
    patronymic: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    issuedBy: "",
    countryOfIssue: "",
    citizenship: "",
    nationality: "",
    iin: "",
    address: {
      city: "",
      street: "",
      houseNumber: ""
    },
    phoneNumber: "",
    academicInfo: {
      degree: "",
      faculty: "",
      specialty: "",
      language: ""
    }
  });

  const [passportStatus, setPassportStatus] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPassportData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/auth/get-passport-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPassportStatus(response.data.passportStatus);

        // Добавьте проверку на наличие данных
        setFormData({
          ...response.data.passportData,
          academicInfo: response.data.passportData?.academicInfo || {
            degree: "",
            faculty: "",
            specialty: "",
            language: ""
          },
          address: response.data.passportData?.address || {
            city: "",
            street: "",
            houseNumber: ""
          }
        });
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchPassportData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parentField, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiUrl}/api/auth/update-passport-data`, {
        token: localStorage.getItem("token"),
        ...formData
      });
      setMessage("Данные успешно сохранены!");
    } catch (error) {
      // обработка ошибок
    }
  };

  if (passportStatus === "pending") {
    return (
      <div className="passport__status_root full-screen passport-fullscreen">
        <ArrowBackIcon className="back-button" onClick={onClose} />
        <p className="passport-status">Ваши паспортные данные находятся на проверке.</p>
      </div>
    );
  }

  if (passportStatus === "verified") {
    return null;
  }

  return (
    <div className="passport-form-container full-screen passport-fullscreen">
      <div className="header-passport-form">
        <ArrowBackIcon className="back-button" onClick={onClose} />
        {passportStatus === "rejected" && !message && (
          <p className="passport-status-rejected">Ваши паспортные данные отклонены администратором!</p>
        )}

        <h3 className="passport-form-title">Заполните паспортные данные</h3>
      </div>
      
      {message && <p className="passport-form-message">{message}</p>}
      <form className="passport-form" onSubmit={handleSubmit}>
        {/* Личные данные */}
        <section className="form-section">
          <h3 className="section-title">Личная информация</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Пол:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
            </div>

            <div className="form-group">
              <label>Дата рождения:</label>
              <input type="date" name="birthDate" 
                value={formData.birthDate} 
                onChange={handleChange}
                required />
            </div>
          </div>
        </section>

        {/* Паспортные данные */}
        <section className="form-section">
          <h3 className="section-title">Паспортные данные</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Гражданство:</label>
              <select name="citizenship" value={formData.citizenship} 
                onChange={handleChange} required>
                <option value="">Выберите страну</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Номер паспорта:</label>
              <input className="passport-input" type="text" name="passportNumber" 
                value={formData.passportNumber}
                onChange={handleChange}
                required />
            </div>

            <div className="form-group">
              <label>Дата выдачи:</label>
              <input type="date" name="passportIssueDate"
                value={formData.passportIssueDate}
                onChange={handleChange}
                required />
            </div>

            <div className="form-group">
              <label>Срок действия:</label>
              <input type="date" name="passportExpiryDate"
                value={formData.passportExpiryDate}
                onChange={handleChange}
                required />
            </div>

            <div className="form-group">
            <label>Страна выдачи паспорта:</label>
            <select 
              name="countryOfIssue" 
              value={formData.countryOfIssue}
              onChange={handleChange}
              required>
              <option value="">Выберите страну</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
          <label>Национальность:</label>
          <input className="passport-input" type="text" 
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required />
        </div>
        
        <div className="form-group">
          <label>ИИН:</label>
          <input className="passport-input" type="text" 
            name="iin"
            value={formData.iin}
            onChange={handleChange}
            pattern="\d{12}"
            title="ИИН должен содержать 12 цифр"
            required />
        </div>      
          </div>
        </section>

                
        {/* Адрес проживания */}
        <section className="form-section">
          <h3 className="section-title">Адрес проживания</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Город:</label>
              <input className="passport-input"  type="text" 
                name="address.city"
                value={formData.address.city}
                onChange={(e) => handleNestedChange("address", "city", e.target.value)}
                required />
            </div>
            <div className="form-group">
              <label>Улица:</label>
              <input  className="passport-input" type="text" 
                name="address.street"
                value={formData.address.street}
                onChange={(e) => handleNestedChange("address", "street", e.target.value)}
                required />
            </div>
            <div className="form-group">
              <label>Дом:</label>
              <input className="passport-input"  type="text" 
                name="address.houseNumber"
                value={formData.address.houseNumber}
                onChange={(e) => handleNestedChange("address", "houseNumber", e.target.value)}
                required />
            </div>
          </div>
        </section>

        {/* Академическая информация */}
        <section className="form-section">
          <h3 className="section-title">Академическая информация</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Ступень обучения:</label>
              <select name="academicInfo.degree" 
                value={formData.academicInfo?.degree || ""}
                onChange={(e) => handleNestedChange("academicInfo", "degree", e.target.value)}
                required>
                <option value="">Выберите ступень</option>
                <option value="Бакалавриат">Бакалавриат</option>
                <option value="Магистратура">Магистратура</option>
                <option value="Докторантура">Докторантура</option>
              </select>
            </div>

            <div className="form-group">
              <label>Факультет:</label>
              <select name="academicInfo.faculty"
                value={formData.academicInfo.faculty}
                onChange={(e) => handleNestedChange("academicInfo", "faculty", e.target.value)}
                required>
                <option value="">Выберите факультет</option>
                {FACULTIES.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            
            {/* Специальность (в секции академической информации) */}
            <div className="form-group">
              <label>Специальность:</label>
              <select 
                name="academicInfo.specialty"
                value={formData.academicInfo.specialty}
                onChange={(e) => handleNestedChange("academicInfo", "specialty", e.target.value)}
                required>
                <option value="">Выберите специальность</option>
                {SPECIALTIES[formData.academicInfo.faculty]?.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Язык обучения:</label>
              <select name="academicInfo.language"
                value={formData.academicInfo.language}
                onChange={(e) => handleNestedChange("academicInfo", "language", e.target.value)}
                required>
                <option value="">Выберите язык</option>
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <button type="submit" className="submit-button">Сохранить</button>
      </form>
    </div>
  );
};

export default UpdatePassportForm;