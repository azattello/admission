// EmailVerifiedPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerifiedPage = () => {
    const navigate = useNavigate(); // useNavigate вместо useHistory

    useEffect(() => {
        // Можно добавить таймер для автоматической переадресации на главную страницу
        setTimeout(() => {
            navigate('/main'); // Редирект на главную страницу или логин
        }, 3000); // Через 3 секунды
    }, [navigate]);

    return (
        <div className="verification-success">
            <h1>Ваш email успешно подтвержден!</h1>
            <p>Вы будете автоматически перенаправлены на главную страницу.</p>
        </div>
    );
};

export default EmailVerifiedPage;
