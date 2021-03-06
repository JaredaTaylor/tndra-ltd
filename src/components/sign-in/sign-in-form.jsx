import { useState } from "react";
import { useDispatch } from 'react-redux'
import FormInput from "../form-input/form-input";
import { SignInContainer, H2, ButtonsContainer } from "./sign-in-form.styles";
import Button, { BUTTON_TYPE } from "../button/button";
import { googleSigninStart, emailSigninStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // confirm user authenticated
        try {
            dispatch(emailSigninStart(email, password));
            //await signInAuthUserWithEmailAndPassword(email, password);
            //setCurrentUser(user);
            resetFormFields();

        } catch(error) {
            if(error.code === 'auth/wrong-password') {
                alert('incorrect password');
            }
            if(error.code === 'auth/user-not-found') {
                alert('email is not associated with an account');
            }
            else {
                console.log(error);
            }
        }
        
        // create user document from returned createAuthUserWithEmailAndPassword
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        dispatch(googleSigninStart());
        //await signInWithGooglePopup();
        //setCurrentUser(user);
    }

    return (
        <SignInContainer>
            <H2>
                Already have an account?
            </H2>
            <span>
                Sign in with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email'  type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password'  type='password' required onChange={handleChange} name='password' value={password} />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;