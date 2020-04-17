import keyMirror from 'keymirror';

export const authenticationTypes = keyMirror({
    LOGIN_REQUEST: null,
    LOGIN_SUCCESS: null,
    LOGIN_FAILURE: null,

    LOGOUT: null,

    REGISTER_REQUEST: null,
    REGISTER_SUCCESS: null,
    REGISTER_FAILURE: null,
});