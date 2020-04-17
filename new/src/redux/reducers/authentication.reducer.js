import { authenticationTypes } from '../types';

export default function authentication(state = {}, action) {
    switch (action.type) {

        case authenticationTypes.LOGIN_SUCCESS:
            return {
                token: action.token,
                isAuth: true
            };

        //LOGOUT
        case authenticationTypes.LOGOUT:
            return {};
        default:
            return state
    }
}