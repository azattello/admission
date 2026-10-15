import React, { useState } from "react";
import "./css/login.css";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';  // импортируем useDispatch для работы с Redux
import { login } from '../action/user';  // импортируем наш экшен

const Login = ({ onRegClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();


  
  const dispatch = useDispatch();  // получаем доступ к dispatch


  // Функция для обработки отправки формы
  const handleLogin = async () => {
    // Вызываем экшен регистрации через dispatch
    const result = await dispatch(login(email, password));
    if (result) {
      // Если регистрация успешна, можно выполнить дополнительные действия, например:
      alert(t('registration_success'));
    }
  }


  return (
    <div className="auth">
      <div className="form">
        <h1 className="h1-auth"> {t('login')}</h1>
        
        <label className="label-auth" htmlFor="email">{t('email')}</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          className="input"
          placeholder={t('placeholder_email')}
        />
        
        <label className="label-auth" htmlFor="password">{t('password')}</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="input"
          placeholder="********"
        />

        <button className="buttonLogin" onClick={handleLogin}>{t('login')}</button>
        <p className="link__auth" onClick={onRegClick}>{t('not_have_account')}</p>
      </div>
    </div>
  );
};

export default Login;
