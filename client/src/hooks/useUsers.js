import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config'

const useUsers = (initialPage = 1, initialLimit = 10) => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(
    async (page = currentPage, limit = initialLimit) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${config.apiUrl}/api/user/users`, {
          params: {
            page,
            limit,
          },
        });

        const { users, totalCount, currentPage, totalPages } = response.data;

        setUsers(users);
        setTotalCount(totalCount);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка загрузки данных');
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, initialLimit] // Зависимости
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Указали fetchUsers как зависимость

  return {
    users,
    totalCount,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
    fetchUsers,
  };
};

export default useUsers;
