import React, { useState } from "react";
import useUserProfile from "../hooks/useUserProfile"; // Импортируем хук
import './css/userStatus.css'
import axios from "axios"; // Для отправки запроса на сервер
import config from "../config";

const UserProfileStatus = () => {
    const { userData, loading, error } = useUserProfile();
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [codeError, setCodeError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    // Если данные профиля еще загружаются
    if (loading) {
        return <div className="verification-warning-mini-status"><p>Загрузка...</p></div>;
    }

    // Если возникла ошибка при загрузке
    if (error) {
        return <div className="verification-warning-mini-status"><p>{error}</p></div>;
    }

    // Если нет данных пользователя
    if (!userData) {
        return <div className="verification-warning-mini-status"><p>Пользователь не найден</p></div>;
    }

    // Обработчик отправки кода на email
    const handleSend = async () => {
        try {
            setCodeError(null);
            setIsVerifying(true);

            // Отправляем запрос на сервер для отправки кода на email
            const response = await axios.post(`${config.apiUrl}/api/auth/send-verification-email`, {
               email: userData.email,
            });

            if (response.status === 200) {
                setVerificationCodeSent(true); // Показываем поле для ввода кода
            }
        } catch (err) {
            setCodeError('Не удалось отправить код. Попробуйте снова.');
            setIsVerifying(false);
        }
    };


    return (
        <div className="profile-status">
            {!userData.isVerifiedEmail && (
                <div className="verification-warning">
                    <p>Ваш email еще не подтвержден. Подтвердите email для продолжения регистрации.</p>

                    {!verificationCodeSent ? (
                        <div>
                            <button onClick={handleSend} disabled={isVerifying}>
                                {isVerifying ? 'Отправка...' : 'Отправить ссылку для верификации'}
                            </button>
                            {codeError && <div className="error">{codeError}</div>}
                        </div>
                    ) : (
                        <div className="verification-input">
                            <p>Ссылка для верификации отправлено, проверьте почту</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfileStatus;
