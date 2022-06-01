import { useState } from "react";
import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import FormInput from "../form-input/form-input";
import './sign-in-form.scss';
import Button from "../button/button";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // confirm user authenticated
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
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
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    }

    return (
        <div className="sign-in-container">
            <h2>
                Already have an account?
            </h2>
            <span>
                Sign in with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email'  type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password'  type='password' required onChange={handleChange} name='password' value={password} />

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;