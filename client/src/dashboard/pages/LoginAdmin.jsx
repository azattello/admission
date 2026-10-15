import React, { useState } from "react";
import "./css/login.css";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';  // импортируем useDispatch для работы с Redux
import { useNavigate } from "react-router-dom"; // Импортируем навигацию
import { login } from '../../action/adminAuth.js';  // импортируем наш экшен

const LoginAdmin = ({ onRegClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate(); // Используем хук навигации

  
  const dispatch = useDispatch();  // получаем доступ к dispatch


  // Функция для обработки отправки формы
  const handleLogin = async () => {
    // Вызываем экшен регистрации через dispatch
    const result = await dispatch(login(email, password));
    if (result) {
      // Если регистрация успешна, можно выполнить дополнительные действия, например:
      alert(t('registration_success'));
      navigate("/dashboard"); // Перенаправляем в админку
    }
  }


  return (
    <div className="auth-admin">
      <div className="form-admin">
        <h1 className="h1-auth-admin"> {t('login')}</h1>
        
        <label className="label-auth-admin" htmlFor="email">{t('email')}</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          className="input-admin"
          placeholder={t('placeholder_email')}
        />
        
        <label className="label-auth-admin" htmlFor="password">{t('password')}</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="input-admin"
          placeholder="********"
        />

        <button className="buttonLogin-admin" onClick={handleLogin}>{t('login')}</button>
        <p className="link__auth-admin" onClick={onRegClick}>{t('not_have_account')}</p>
      </div>
    </div>
  );
};

export default LoginAdmin;
