import React, { useState } from "react";
import "./css/login.css";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';  // импортируем useDispatch для работы с Redux
import { registration } from '../action/user';  // импортируем наш экшен

const Registration = ({ onLoginClick }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch();  // получаем доступ к dispatch


  // Функция для обработки отправки формы
  const handleRegistration = async () => {
    // Вызываем экшен регистрации через dispatch
    const result = await dispatch(registration(name, surname, email, password));
    if (result) {
      // Если регистрация успешна, можно выполнить дополнительные действия, например:
      alert(t('registration_success'));
    }
  }

  return (
    <div className="auth">
      <div className="form form-reg">
        <h1 className="h1-auth">{t('register')}</h1>
        
        <label className="label-auth" htmlFor="name">{t('name')}</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          className="input"
          placeholder={t('placeholder_name')}
        />
        
        <label className="label-auth" htmlFor="surname">{t('surname')}</label>
        <input
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
          type="text"
          className="input"
          placeholder={t('placeholder_surname')}
        />
        
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
          placeholder={t('placeholder_passwd')}
        />

        <button className="buttonLogin" onClick={handleRegistration}>{t('register_now')}</button>
        <p className="link__auth" onClick={onLoginClick}>{t('have_account')}</p>
      </div>
    </div>
  );
};

export default Registration;
