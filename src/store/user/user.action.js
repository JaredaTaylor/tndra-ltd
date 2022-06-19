import { createAction } from "../../utils/reducer/reducer";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSigninStart = () =>
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSigninStart = (email, password) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signinSuccess = (user) =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signinFailure = (error) =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

// sign up functions

export const signupStart = (email, password, displayName) =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName});

export const signupSuccess = (user, additionalDetails) =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalDetails});

export const signupFailure = (error) =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);

// sign out functions

export const signoutStart = () =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signoutSuccess = () =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signoutFailure = (error) =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);