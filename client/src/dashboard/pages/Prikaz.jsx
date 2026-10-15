import React, { useState } from "react";
import "./css/prikaz.css";
import Sidebar from "../components/Sidebar";

const Prikaz = () => {
  // Пример списка студентов для выбора (данные можно заменить на реальные)
  const studentList = [
    { id: 1, name: "Иванов Иван", grade: "A" },
    { id: 2, name: "Петров Петр", grade: "B" },
    { id: 3, name: "Сидоров Сидор", grade: "C" },
    { id: 4, name: "Козлов Козел", grade: "A" },
    { id: 5, name: "Смирнов Алексей", grade: "B" },
    { id: 6, name: "Васильев Василий", grade: "A" },
    // Можно добавить дополнительные записи
  ];

  // Состояние для выбранных студентов (до 20 человек)
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Состояние для сформированных групп
  const [groups, setGroups] = useState([]);

  // Обработка выбора/снятия выбора студента
  const handleSelectStudent = (student) => {
    if (selectedStudents.find((s) => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id));
    } else {
      if (selectedStudents.length < 20) {
        setSelectedStudents([...selectedStudents, student]);
      } else {
        alert("Можно выбрать максимум 20 студентов");
      }
    }
  };

  // Создание группы из выбранных студентов
  const handleCreateGroup = () => {
    if (selectedStudents.length === 0) {
      alert("Пожалуйста, выберите студентов для создания группы");
      return;
    }
    const newGroup = {
      id: Date.now(), // Используем timestamp как уникальный идентификатор
      students: selectedStudents,
    };
    setGroups([...groups, newGroup]);
    // После создания группы сбрасываем выбранных студентов
    setSelectedStudents([]);
  };

  return (
    <div className="prikaz-wrapper">
      <div className="prikaz-layout">
        <Sidebar defaultStagesOpen={true}/>
        <main className="main-panel">
          <div className="panel-section">
            <h2>Формирование группы </h2>

            {/* Таблица студентов */}
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Выбрать</th>
                    <th>Студент</th>
                    <th>Оценка</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student) => (
                    <tr
                      key={student.id}
                      className={
                        selectedStudents.find((s) => s.id === student.id)
                          ? "selected"
                          : ""
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedStudents.find((s) => s.id === student.id)
                          }
                          onChange={() => handleSelectStudent(student)}
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Кнопка создания группы */}
            <div className="group-actions">
              <button className="btn-create-group" onClick={handleCreateGroup}>
                Создать группу
              </button>
            </div>

            {/* Секция отображения созданных групп */}
            <div className="groups-section">
              <h2>Созданные группы</h2>
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
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Prikaz;
