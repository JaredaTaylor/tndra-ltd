import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase";
import FormInput from "../form-input/form-input";
import './sign-up-form.scss';
import Button from "../button/button";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // passwords match
        if (password !== confirmPassword) {
            alert("passwords do not match.");
            return;
        }

        // confirm user authenticated
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, { displayName });
            resetFormFields();

        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.')
            }
            if (error.code === 'auth/weak-password') {
                alert('Weak password, password must be at least 6 characters.')
            }
        }
        
        // create user document from returned createAuthUserWithEmailAndPassword
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>
                Don't have an account?
            </h2>
            <span>
                Sign up with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />

                <FormInput label='Email'  type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password'  type='password' required onChange={handleChange} name='password' value={password} />

                <FormInput label='Confirm Password'  type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;