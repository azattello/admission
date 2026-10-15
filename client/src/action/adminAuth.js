import axios from 'axios'
import {setAdmin} from "../reducers/adminReducer";
import config from '../config';

let configUrl = config.apiUrl;

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${configUrl}/api/admin/login`, {
                email,
                password
            });

            const { token, admin } = response.data;

            // Сохраняем данные пользователя и токен
            dispatch(setAdmin(admin));
            localStorage.setItem('adminToken', token);


            return true; // Успешная авторизация
        } catch (e) {
            console.error(e);
            alert(e.response?.data?.message || "Ошибка при авторизации");
            return false; // Ошибка авторизации
        }
    }
}


export const authAdmin =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${configUrl}/api/admin/auth`, 
                {headers:{Authorization: `Bearer ${localStorage.getItem('adminToken')}`}}
            )
            dispatch(setAdmin(response.data.admin))
            console.log(response.data.admin)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const { message, errors } = error.response.data;
                console.log('Validation errors:', errors);
                alert(message);
              } else {
                console.error('Error:', error.message);
              }
        }
    }
}


export const createAdmin =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${configUrl}/api/auth/auth`, 
                {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setAdmin(response.data.admin))
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const { message, errors } = error.response.data;
                console.log('Validation errors:', errors);
                alert(message);
              } else {
                console.error('Error:', error.message);
              }
        }
    }
}


  
  