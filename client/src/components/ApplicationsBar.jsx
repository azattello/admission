import React, { useEffect, useState } from "react";
import './css/applicationsBar.css';
import config from "../config";
import UpdatePassportForm from "./UpdatePassportForm";

const STAGES = [
    { key: "personal", label: "1. Личные данные", description: "Заполните личные данные." },
    { key: "selection", label: "2. Отбор", description: "Пройдите этап отбора." },
    { key: "agreement", label: "3. Договор", description: "Подпишите договор." },
    { key: "payment", label: "4. Оплата", description: "Оплатите обучение." },
    { key: "actionCheck", label: "5. Перевод документов", description: "Подтвердите перевод документов." },
    { key: "prikaz", label: "6. Приказ", description: "Дождитесь приказа о зачислении." },
    { key: "visaInvitation", label: "7. Визовый блок", description: "Получите приглашение для визы." },
    { key: "arrivalNotification", label: "8. Уведомление о прибытии", description: "Подтвердите прибытие." }
];

const ApplicationsBar = () => {
    const [stages, setStages] = useState({});
    const [isPassportFormOpen, setIsPassportFormOpen] = useState(false);

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/user/stages`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                if (data.stages) {
                    setStages(data.stages);
                }
            } catch (error) {
                console.error("Ошибка загрузки этапов:", error);
            }
        };

        fetchStages();
    }, []);

    return (
        <div className="application-wrapper">
            <div className="title-application">Этапы приемной комиссии</div>
            <div className="apps-steps">
                {STAGES.map(stage => (
                    <div className="step" key={stage.key}>
                        <div className={`step-status ${stages[stage.key] === 'completed' ? 'step-status-archive' : ''}`}>
                            {stages[stage.key] === 'completed' ? "✓" : "•"}
                        </div>
                        <div className="step-container">
                            <div className="step-text">
                                <h1>{stage.label}</h1>
                                <p>{stage.description}</p>
                            </div>
                            {stages[stage.key] !== "completed" && stage.key === "personal" && (
                                <div className="step-button" onClick={() => setIsPassportFormOpen(true)}>
                                    Выполнить
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Полноэкранное окно UpdatePassportForm */}
            {isPassportFormOpen && (
                <UpdatePassportForm onClose={() => setIsPassportFormOpen(false)} />
            )}
        </div>
    );
}

export default ApplicationsBar;
