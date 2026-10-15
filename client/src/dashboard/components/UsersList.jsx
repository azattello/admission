import React, { useState } from 'react';
import useUsers from '../../hooks/useUsers';
import './css/UsersList.css';

const UsersList = () => {
  const {
    users,
    totalCount,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleActionClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="users-wrapper">
      <h1 className="users-title">Список студентов</h1>
      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Роль</th>
              <th>Email</th>
              <th>Дата регистрации</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleActionClick(user)}
                  >
                    Действие
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages} (Всего студентов: {totalCount})
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Следующая
        </button>
      </div>

      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <p>Модальное окно для пользователя {selectedUser.name} {selectedUser.surname}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
