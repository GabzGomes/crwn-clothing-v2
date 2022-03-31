import { useState } from "react";

import { userAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { Button } from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: "",
	password: ""
};

export const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
    }

	const handleSubmit = async (event) => {
		event.preventDefault();

        try {
            const response = await userAuthUserWithEmailAndPassword(
                email,
                password
            );
           setFormFields(defaultFormFields);
           console.log(response)
        } catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;
                case 'auth/user-not-found':
                    alert('Email not found')
                    break;
                default:
                    console.log(error);
            }
        }	
	};

	const handleChanges = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<p>Sign In with your email and password.</p>

			<form className="group" onSubmit={handleSubmit}>
			
				<FormInput
					label="Email"
					type="email"
					className="form-input"
					name="email"
					value={email}
					onChange={handleChanges}
					required/>
				
				<FormInput
					label="Password"
					type="password"
					className="form-input"
					name="password"
					value={password}
					onChange={handleChanges}
					required/>
			
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={'google'} onClick={logGoogleUser}>Google Sign In</Button>
                </div>
			</form>
		</div>
	);
};