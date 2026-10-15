import React, { useState } from "react";
import "./css/agreement.css";
import Sidebar from "../components/Sidebar";

const Agreement = () => {
  // Исходные данные – список студентов, подписавших договор
  const [studentAgreements, setStudentAgreements] = useState([
    {
      id: 1,
      name: "Иванов Иван",
      contractLink: "#", // Здесь можно указать реальную ссылку на договор
      reviewStatus: "pending", // "pending" (на проверке), "approved" или "rejected"
      rejectionComment: "",
    },
    {
      id: 2,
      name: "Петров Петр",
      contractLink: "#",
      reviewStatus: "pending",
      rejectionComment: "",
    },
    {
      id: 3,
      name: "Сидоров Сидор",
      contractLink: "#",
      reviewStatus: "pending",
      rejectionComment: "",
    },
  ]);

  // Состояния для модального окна проверки договора
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reviewStatus, setReviewStatus] = useState(""); // "approved" или "rejected"
  const [rejectionComment, setRejectionComment] = useState("");

  
      const [statusFilter, setStatusFilter] = useState('');
      const [studentFilter, setStudentFilter] = useState('');
      
  // Открываем модальное окно для выбранного студента
  const openModal = (student) => {
    setSelectedStudent(student);
    setReviewStatus(student.reviewStatus === "pending" ? "" : student.reviewStatus);
    setRejectionComment(student.rejectionComment || "");
    setIsModalOpen(true);
  };

  // Обработка сохранения результата проверки
  const handleSave = () => {
    if (!reviewStatus) {
      alert("Пожалуйста, выберите статус");
      return;
    }
    setStudentAgreements(
      studentAgreements.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, reviewStatus, rejectionComment }
          : s
      )
    );
    closeModal();
  };

  // Закрытие модального окна и сброс состояний
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setReviewStatus("");
    setRejectionComment("");
  };

  // Функция для отображения статуса в читаемом виде
  const renderStatusText = (status) => {
    if (status === "approved") return "Одобрено";
    if (status === "rejected") return "Отклонено";
    return "На проверке";
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-layout">
        <Sidebar defaultStagesOpen={true}/>
        <main className="main-panel">
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

          <div className="panel-section">
            <h2>Договоры студентов</h2>
            <table className="agreements-table">
              <thead>
                <tr>
                  <th>Студент</th>
                  <th>Договор</th>
                  <th>Статус договора</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {studentAgreements.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <a
                        href={student.contractLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Скачать договор
                      </a>
                    </td>
                    <td className={`status ${student.reviewStatus}`}>
                      {renderStatusText(student.reviewStatus)}
                    </td>
                    <td className="actions">
                      <button
                        className="btn-review"
                        onClick={() => openModal(student)}
                      >
                        Проверить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Модальное окно проверки договора */}
      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Проверка договора</h2>
            </div>
            <div className="modal-body">
              {selectedStudent && (
                <div className="student-info">
                  <p>
                    <strong>Студент:</strong> {selectedStudent.name}
                  </p>
                  <p>
                    <strong>Договор:</strong>{" "}
                    <a
                      href={selectedStudent.contractLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Скачать договор
                    </a>
                  </p>
                </div>
              )}
              <div className="status-selection">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value="approved"
                    checked={reviewStatus === "approved"}
                    onChange={(e) => setReviewStatus(e.target.value)}
                  />
                  Одобрено
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="reviewStatus"
                    value="rejected"
                    checked={reviewStatus === "rejected"}
                    onChange={(e) => setReviewStatus(e.target.value)}
                  />
                  Отклонено
                </label>
              </div>
              {reviewStatus === "rejected" && (
                <div className="comment-field">
                  <label>
                    Комментарий:
                    <textarea
                      value={rejectionComment}
                      onChange={(e) => setRejectionComment(e.target.value)}
                      placeholder="Опишите, что не так"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-submit" onClick={handleSave}>
                Сохранить
              </button>
              <button className="btn-cancel" onClick={closeModal}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agreement;
