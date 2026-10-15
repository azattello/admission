import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

const useUserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`${config.apiUrl}/api/user/profile`, { 
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Или из cookies
                });
                setUserData(data.user); // Сохраняем данные пользователя
            } catch (err) {
                setError(err); // Сохраняем ошибку, если она есть
                console.error('Error fetching user profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); // Пустой массив, чтобы выполнить запрос только один раз при монтировании компонента

    return { userData, loading, error };
};

export default useUserProfile;
