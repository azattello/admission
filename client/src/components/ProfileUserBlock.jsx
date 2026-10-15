import React from "react";
import './css/ProfileUserBlock.css';
import ava from '../assets/img/ava.jpg'
import useUserProfile from '../hooks/useUserProfile.js'

const ProfileUserBlock = () => {
    
    const { userData, loading, error } = useUserProfile(); // Вызов кастомного хука

    
    if (loading) {
        return <div>Loading...</div>; // Отображение состояния загрузки
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Обработка ошибок
    }

    if (!userData) {
        return <div>No user data available</div>; // Если данные пустые
    }


    return (
        <div className="profile-user">
            <div className="profile-ava-container">
                <img src={ava} alt="" className="ava" />
            </div>
            <div className="mainInfo-profile">
                <div className="fio">{userData.name} {userData.surname}</div>
                <p>{userData.email}</p>
                <p>{userData.role}</p>
                <p>040103501820</p>
                
                <div className="buttons-profile">
                    <button className="resetPassword-button" >Сброс пароля</button>
                    <button className="resetPassword-button">Редактировать</button>
                </div>

            </div>
            <div className="line"></div>
            <div className="moreInfo-profile">
                <p>Амстердам</p>
                <p>Муж.</p>
                <p>2 курс</p>
                <p>Абитуриент</p>
                <p>Дата рождения 03.01.2004г</p>
            </div>
        </div>
  
    )
}

export default ProfileUserBlock;