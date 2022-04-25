import { useState } from "react";

import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: "",
	password: ""
};

export const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const dispatch = useDispatch();

    const logGoogleUser = () => dispatch(googleSignInStart());
    

	const handleSubmit = async (event) => {
		event.preventDefault();

        try {
            dispatch(emailSignInStart(
                email,
                password
            ));
           	setFormFields(defaultFormFields);
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
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Sign In</Button>
				</div>
			</form>
		</div>
	);
};