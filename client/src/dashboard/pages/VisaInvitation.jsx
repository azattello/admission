import React, { useState } from "react";
import "./css/visainvitation.css";
import Sidebar from "../components/Sidebar";

const VisaInvitation = () => {
  // Пример статичных данных – список групп с участниками
  const [groups] = useState([
    {
      id: 1,
      groupName: "Группа 1",
      students: [
        { id: 1, name: "Иванов Иван", age: 21, email: "ivanov@mail.com" },
        { id: 2, name: "Петров Петр", age: 22, email: "petrov@mail.com" },
      ],
    },
    {
      id: 2,
      groupName: "Группа 2",
      students: [
        { id: 3, name: "Сидоров Сидор", age: 20, email: "sidorov@mail.com" },
        { id: 4, name: "Козлов Козел", age: 23, email: "kozlov@mail.com" },
      ],
    },
    {
      id: 3,
      groupName: "Группа 3",
      students: [
        { id: 5, name: "Смирнов Алексей", age: 24, email: "smirnov@mail.com" },
        { id: 6, name: "Васильев Василий", age: 21, email: "vasiliev@mail.com" },
      ],
    },
    {
      id: 4,
      groupName: "Группа 4",
      students: [
        { id: 7, name: "Михайлов Михаил", age: 22, email: "mihailov@mail.com" },
        { id: 8, name: "Егоров Егор", age: 23, email: "egorov@mail.com" },
      ],
    },
    {
      id: 5,
      groupName: "Группа 5",
      students: [
        { id: 9, name: "Николаев Николай", age: 20, email: "nikolaev@mail.com" },
        { id: 10, name: "Фёдоров Фёдор", age: 22, email: "fedorov@mail.com" },
      ],
    },
    {
      id: 6,
      groupName: "Группа 6",
      students: [
        { id: 11, name: "Андреев Андрей", age: 21, email: "andreev@mail.com" },
        { id: 12, name: "Сергеев Сергей", age: 24, email: "sergeev@mail.com" },
      ],
    },
  ]);

  // Состояние для открытия модального окна и выбранной группы
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Открытие модального окна при клике на карточку группы
  const openModal = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-layout">
        <Sidebar defaultStagesOpen={true}/>
        <main className="main-panel">
          <div className="panel-section">
            <h2>Созданные группы</h2>
            <div className="groups-container">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="group-card"
                  onClick={() => openModal(group)}
                >
                  <h3>{group.groupName}</h3>
                  <p>
                    <strong>Студенты:</strong>{" "}
                    {group.students.map((s) => s.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Модальное окно с информацией о группе */}
      {isModalOpen && selectedGroup && (
        <div className="modal-background">
          <div className="modal-box">
            <div className="modal-header">
              <h2>{selectedGroup.groupName}</h2>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <h3>Анкета участников</h3>
              <table className="group-details-table">
                <thead>
                  <tr>
                    <th>Имя</th>
                    <th>Возраст</th>
                    <th>Email</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGroup.students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.email}</td>
                      <td>
                        <button className="btn-export">
                          Выгрузить Invitation Letter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="btn-group-action">
              Выгрузить приказ
              </button>
              <button className="btn-group-action">
                Загрузить Приглашение на визу
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaInvitation;
