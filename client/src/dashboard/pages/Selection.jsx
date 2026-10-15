import React, { useState } from "react";
import "./css/selection.css"; // Импорт обновлённых стилей
import Sidebar from "../components/Sidebar";

const Selection = () => {
  // Фильтры для таблицы студентов с результатами
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Состояния для модального окна создания группы
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupStudents, setSelectedGroupStudents] = useState([]);
  const [groupLink, setGroupLink] = useState("");
  const [groupDate, setGroupDate] = useState("");
  const [groupTime, setGroupTime] = useState("");
  const [groups, setGroups] = useState([]);

  // Список студентов с баллами (функция 1) – этот список НЕ связан со списком для групп
  const studentsScores = [
    { id: 1, name: "Иванов Иван", score: 85, status: "Пройден" },
    { id: 2, name: "Петров Петр", score: 65, status: "Не пройден" },
    { id: 3, name: "Сидоров Сидор", score: 92, status: "Пройден" },
  ];

  // Отдельный список студентов для выбора в модальном окне создания группы
  const availableStudents = [
    { id: 101, name: "Алексей Смирнов" },
    { id: 102, name: "Мария Козлова" },
    { id: 103, name: "Николай Федоров" },
    { id: 104, name: "Ольга Иванова" },
    { id: 105, name: "Дмитрий Соколов" },
    // можно добавить ещё...
  ];

  // Функция выбора/снятия выбора студента в списке для группы
  const toggleStudentSelection = (student) => {
    if (selectedGroupStudents.find((s) => s.id === student.id)) {
      setSelectedGroupStudents(
        selectedGroupStudents.filter((s) => s.id !== student.id)
      );
    } else {
      if (selectedGroupStudents.length < 20) {
        setSelectedGroupStudents([...selectedGroupStudents, student]);
      } else {
        alert("Максимум 20 студентов можно выбрать");
      }
    }
  };

  // Создание новой группы
  const handleCreateGroup = () => {
    const newGroup = {
      id: Date.now(),
      students: selectedGroupStudents,
      link: groupLink,
      date: groupDate,
      time: groupTime,
    };
    setGroups([...groups, newGroup]);
    // Сброс полей модального окна
    setSelectedGroupStudents([]);
    setGroupLink("");
    setGroupDate("");
    setGroupTime("");
    setIsModalOpen(false);
  };

  // Фильтрация списка студентов по имени и статусу
  const filteredStudents = studentsScores.filter((student) => {
    const matchesName = student.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchesStatus = statusFilter ? student.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  return (
    <div className="admin-wrapper">
      <div className="admin-layout">
        <Sidebar defaultStagesOpen={true}/>
        <main className="main-panel">
          <div className="panel-section">
            {/* Фильтры и кнопка создания группы */}
            <div className="filter-bar">
              <input
                type="text"
                placeholder="Поиск по имени"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Все статусы</option>
                <option value="Пройден">Пройден</option>
                <option value="Не пройден">Не пройден</option>
              </select>
              <button
                className="btn-create-group"
                onClick={() => setIsModalOpen(true)}
              >
                Создать группу
              </button>
            </div>

            {/* Таблица со студентами и их результатами теста */}
            <section className="scores-section">
              <h2>Список студентов с результатами теста</h2>
              <table className="scores-table">
                <thead>
                  <tr>
                    <th>Студент</th>
                    <th>Баллы</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="4">Нет студентов для отображения</td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.score}</td>
                        <td
                          className={
                            student.status === "Пройден"
                              ? "status passed"
                              : "status failed"
                          }
                        >
                          {student.status}
                        </td>
                        <td className="actions">
                          <button className="btn-view">Просмотреть</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>

            {/* Секция отображения созданных групп */}
            <section className="groups-section">
              <h2>Созданные группы для собеседования</h2>
              {groups.length === 0 ? (
                <p>Группы пока не созданы.</p>
              ) : (
                groups.map((group) => (
                  <div key={group.id} className="group-card">
                    <h3>Группа #{group.id}</h3>
                    <p>
                      <strong>Студенты:</strong>{" "}
                      {group.students.map((s) => s.name).join(", ")}
                    </p>
                    <div className="group-details">
                      <label>
                        Ссылка для собеседования:
                        <input type="text" value={group.link} readOnly />
                      </label>
                      <label>
                        Дата собеседования:
                        <input type="date" value={group.date} readOnly />
                      </label>
                      <label>
                        Время собеседования:
                        <input type="time" value={group.time} readOnly />
                      </label>
                    </div>
                    <button className="btn-submit">
                      Сохранить изменения
                    </button>
                  </div>
                ))
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Модальное окно для создания группы */}
      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Создать группу</h2>
            </div>
            <div className="modal-body">
              <fieldset>
                <legend>Выберите студентов (до 20)</legend>
                <ul className="students-list">
                  {availableStudents.map((student) => (
                    <li key={student.id}>
                      <label className="checkbox-student-label">
                        <input
                          type="checkbox"
                          className="checkbox-student"
                          checked={
                            !!selectedGroupStudents.find(
                              (s) => s.id === student.id
                            )
                          }
                          onChange={() => toggleStudentSelection(student)}
                        />
                        {student.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
              <label>
                Ссылка для собеседования:
                <input
                  type="text"
                  value={groupLink}
                  onChange={(e) => setGroupLink(e.target.value)}
                  placeholder="Введите ссылку"
                />
              </label>
              <label>
                Дата:
                <input
                  type="date"
                  value={groupDate}
                  onChange={(e) => setGroupDate(e.target.value)}
                />
              </label>
              <label>
                Время:
                <input
                  type="time"
                  value={groupTime}
                  onChange={(e) => setGroupTime(e.target.value)}
                />
              </label>
            </div>
            <div className="modal-footer">
              <button className="btn-submit" onClick={handleCreateGroup}>
                Создать группу
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Selection;
