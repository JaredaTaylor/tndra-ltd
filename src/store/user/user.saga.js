import { takeLatest, all, call, put, take } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signinSuccess, signinFailure, signupFailure, signupSuccess, signoutSuccess, signoutFailure } from "./user.action";
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data() }));
    }
    catch (error) {
        yield put(signinFailure(error));
    }
}

export function* signinWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch(error) {
        yield put(signinFailure(error));
    }
}

export function* singinWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch(error) {
        yield put(signinFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    }
    catch (error) {
        yield put(signinFailure(error));
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signupSuccess(user, {displayName}));
    }
    catch(error) {
        yield put(signupFailure(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signoutSuccess());
    }
    catch(error) {
        yield put(signoutFailure(error));
    }
}

export function* signinAfterSignup({payload: {user, additionalDetails}}) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSigninStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signinWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSigninStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signinWithEmail)
}

export function* onSignupStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignupSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signinAfterSignup);
}

export function* onSignoutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSigninStart), call(onEmailSigninStart), call(onSignupStart), call(onSignupSuccess), call(onSignoutStart)])
}