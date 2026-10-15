import React, { useState } from "react";
import "./css/payment.css";
import Sidebar from "../components/Sidebar";

const Payment = () => {
  // Исходные данные – список студентов с информацией об оплате
  const [studentPayments, setStudentPayments] = useState([
    {
      id: 1,
      name: "Иванов Иван",
      paymentStatus: "pending", // возможные значения: "pending", "approved", "rejected"
      rejectionComment: "",
    },
    {
      id: 2,
      name: "Петров Петр",
      paymentStatus: "pending",
      rejectionComment: "",
    },
    {
      id: 3,
      name: "Сидоров Сидор",
      paymentStatus: "pending",
      rejectionComment: "",
    },
  ]);

  // Состояния для модального окна проверки оплаты
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reviewStatus, setReviewStatus] = useState(""); // "approved" или "rejected"
  const [rejectionComment, setRejectionComment] = useState("");


  
        const [statusFilter, setStatusFilter] = useState('');
        const [studentFilter, setStudentFilter] = useState('');
        
  // Открываем модальное окно для выбранного студента
  const openModal = (student) => {
    setSelectedStudent(student);
    setReviewStatus(student.paymentStatus === "pending" ? "" : student.paymentStatus);
    setRejectionComment(student.rejectionComment || "");
    setIsModalOpen(true);
  };

  // Обработка сохранения результата проверки оплаты
  const handleSave = () => {
    if (!reviewStatus) {
      alert("Пожалуйста, выберите статус");
      return;
    }
    setStudentPayments(
      studentPayments.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              paymentStatus: reviewStatus,
              rejectionComment: reviewStatus === "rejected" ? rejectionComment : "",
            }
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
    if (status === "approved") return "Оплачено";
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
            <h2>Проверка оплаты студентов</h2>
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Студент</th>
                  <th>Статус оплаты</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {studentPayments.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td className={`status ${student.paymentStatus}`}>
                      {renderStatusText(student.paymentStatus)}
                    </td>
                    <td className="actions">
                      <button className="btn-review" onClick={() => openModal(student)}>
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

      {/* Модальное окно для проверки оплаты */}
      {isModalOpen && (
        <div className="modal-background">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Проверка оплаты</h2>
            </div>
            <div className="modal-body">
              {selectedStudent && (
                <div className="student-info">
                  <p>
                    <strong>Студент:</strong> {selectedStudent.name}
                  </p>
                </div>
              )}

              {/* Блок с названиями оплат и ссылками «Скачать чек» */}
              <div className="payment-items">
                <div className="payment-item">
                  <p>Оплата за обучение</p>
                  <a href="#" className="download-receipt">
                    Скачать чек
                  </a>
                </div>
                <div className="payment-item">
                  <p>Оплата за медицинскую страховку</p>
                  <a href="#" className="download-receipt">
                    Скачать чек
                  </a>
                </div>
                <div className="payment-item">
                  <p>Оплата за приглашение</p>
                  <a href="#" className="download-receipt">
                    Скачать чек
                  </a>
                </div>
              </div>

              {/* Выбор статуса */}
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

export default Payment;
