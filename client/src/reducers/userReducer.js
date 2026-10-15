const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

const userDefaultState  = {
    currentUser: null,  // Изначально null
    isAuth: false,      // Не аутентифицирован
}

export default function userReducer(state = userDefaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,  // Сохраняем весь объект пользователя
                isAuth: true,
            }
        case LOGOUT:
            localStorage.removeItem('token');
            // Если есть другие данные, которые нужно удалить, добавьте сюда их очистку
            return {
                ...state,
                currentUser: null,  // Обнуляем информацию о пользователе
                isAuth: false,
            }
        default:
            return state;
    }
}

// Action creators
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
