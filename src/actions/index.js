import db, { auth, provider, storage } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER } from './actionType';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';

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

export const setLoading = (status) => {
    return {
        type: SET_LOADING_STATUS,
        payload: status
    }
}

export const getArticles = (payload) => {
    return {
        type: GET_ARTICLES,
        payload
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

export function postArticleApi(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        if (payload.image !== '') {

            // Upload the file and metadata
            const upload = uploadBytesResumable(ref(storage, `images/${payload.image.name}`), payload.image);


            // const upload = ref(`images/${payload.image.name}`).put(payload.image);
            upload.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log(`Progress: ${progress}%`);
                if (snapshot.state === 'running') {
                    console.log(`Progress: ${progress}%`);
                }
                if (snapshot.state === 'success') {
                    console.log('Upload success');
                }
            },
                error => console.log(error.code),
                async () => {
                    // const donwloadURL = await upload.snapshot.ref.getDownloadURL();
                    const donwloadURL = await getDownloadURL(upload.snapshot.ref);
                    await addDoc(collection(db, "articles"), {
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            image: payload.user.photoURL,
                        },
                        date: payload.timestamp,
                        video: payload.video,
                        sharedImg: donwloadURL,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false));
                }
            );
        }
        else {
            addDoc(collection(db, "articles"), {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    image: payload.user.photoURL,
                },
                date: payload.timestamp,
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
            }).then(() => {
                console.log("success");
                dispatch(setLoading(false));
            }).catch((error) => { console.log(error.message); dispatch(setLoading(false)); });
        }
    }
}

export function getArticlesApi() {
    return (dispatch) => {
        dispatch(setLoading(true));
        onSnapshot(
            query(collection(db, "articles"), orderBy("date", "desc")),
            (snapshot) => {
                const payload = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    actor: doc.data().actor,
                    date: doc.data().date,
                    video: doc.data().video,
                    sharedImg: doc.data().sharedImg,
                    comments: doc.data().comments,
                    description: doc.data().description,
                }));
                dispatch(getArticles(payload));
                dispatch(setLoading(false));
            }
        );
    }
}