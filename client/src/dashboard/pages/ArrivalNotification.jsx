import React, { useState } from "react";
import "./css/personal.css";
import Sidebar from "../components/Sidebar";


const ArrivalNotification = () => {
    const [statusFilter, setStatusFilter] = useState('');
    const [studentFilter, setStudentFilter] = useState('');
  

    return (
        <div className="wrapper-admin">
          <div className="structure-admin">
            <Sidebar/>
            <main className="main-personal">
                

                 <div className="admin-panel">
                    <div className="filters">
                        <input
                        type="text"
                        placeholder="Поиск по имени"
                        value={studentFilter}
                        onChange={(e) => setStudentFilter(e.target.value)}
                        />
                        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                        <option value="">Все статусы</option>
                        <option value="Новая">Новая</option>
                        <option value="В обработке">В обработке</option>
                        <option value="Отклонено">Отклонено</option>
                        </select>
                    </div>

                    <table class="applications-table">
                        <thead>
                            <tr>
                                <th>Заявка</th>
                                <th>Студент</th>
                                <th>Дата подачи</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Заявка на обучение</td>
                                <td>Иванов Иван</td>
                                <td>12.01.2025</td>
                                <td class="status in-progress">В обработке</td>
                                <td class="actions">
                                    <button class="view-btn">Просмотреть</button>
                                    <button class="approve-btn">Одобрить</button>
                                    <button class="reject-btn">Отклонить</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Заявка на экзамен</td>
                                <td>Петров Петр</td>
                                <td>15.01.2025</td>
                                <td class="status approved">Одобрено</td>
                                <td class="actions">
                                    <button class="view-btn">Просмотреть</button>
                                    <button class="approve-btn">Одобрить</button>
                                    <button class="reject-btn">Отклонить</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Заявка на отсрочку</td>
                                <td>Сидоров Сидор</td>
                                <td>18.01.2025</td>
                                <td class="status rejected">Отклонено</td>
                                <td class="actions">
                                    <button class="view-btn">Просмотреть</button>
                                    <button class="approve-btn">Одобрить</button>
                                    <button class="reject-btn">Отклонить</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    </div>
                
            </main>
            
          </div>
        </div>
  
    )
}

export default ArrivalNotification;