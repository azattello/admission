const SET_ADMIN = "SET_ADMIN";
const LOGOUT_ADMIN = "LOGOUT_ADMIN";

const adminDefaultState = {
    currentAdmin: null,
    isAuthAdmin: false,
};

export default function adminReducer(state = adminDefaultState, action) {
    switch (action.type) {
        case SET_ADMIN:
            return {
                ...state,
                currentAdmin: action.payload,
                isAuthAdmin: true,
            };
        case LOGOUT_ADMIN:
            localStorage.removeItem("adminToken");
            return {
                ...state,
                currentAdmin: null,
                isAuthAdmin: false,
            };
        default:
            return state;
    }
}

// Action creators
export const setAdmin = (admin) => ({ type: SET_ADMIN, payload: admin });
export const logoutAdmin = () => ({ type: LOGOUT_ADMIN });
