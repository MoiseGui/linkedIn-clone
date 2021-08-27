import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { SET_USER } from './actionType';

export const setUser = (payload) => ({
    type: SET_USER,
    payload
});

export function signInApi() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged((payload) => {
            if (payload) {
                dispatch(setUser(payload));
            }
        });
    }
}

export function signOutApi() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => console.log(error.message));
    }
}