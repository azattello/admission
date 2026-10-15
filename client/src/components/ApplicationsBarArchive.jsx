import React from "react";
import './css/applicationsBar.css';


const ApplicationsBarArchive = () => {
   

    return (
        <div className="application-wrapper">
           <div className="title-application">Выполненные шаги</div>
           <div className="apps-steps">
                
           <div className="step">
                <div className="step-status-archive">✔</div>
                    <div className="step-container">
                        <div className="step-text">
                        <h1>ШАГ №1. Верификация почты </h1>

                            <p>Нужно сделать верификацию почты чтобы дальше продолжить работу</p>
                        </div>
                        
                        <div className="step-archive-status">Выполнено</div>
                    </div>
                </div>

                <div className="step">
                <div className="step-status-archive">✔</div>
                    <div className="step-container">
                        <div className="step-text">
                            <h1>ШАГ №2. Заполнение данных </h1>
                            <p>Нужно заполнить данные чтобы дальше продолжить работу</p>
                        </div>
                        
                        <div className="step-archive-status">Выполнено</div>
                    </div>
                </div>

                
                <div className="step">
                <div className="step-status-archive">✔</div>
                    <div className="step-container">
                        <div className="step-text">
                            <h1>ШАГ №3. Загрузка документов </h1>
                            <p>Нужно загрузить документы чтобы дальше продолжить работу</p>
                        </div>
                        
                        <div className="step-archive-status">Выполнено</div>
                    </div>
                </div>
           </div>
           
        </div>
  
    )
}

export default ApplicationsBarArchive;