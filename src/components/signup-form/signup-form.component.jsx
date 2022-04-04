import {  useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { Button } from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";

import './signup-form.styles.scss';

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const [invalidPassword, setInvalidPassword] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) return setInvalidPassword(true);

		setInvalidPassword(false);

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            setFormFields(defaultFormFields);
            alert("User created with success.")
        } catch(error){
            console.log('Error encoutered creating user', error.message);
        }	
	};

	const handleChanges = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<p>Sign up with your email and password.</p>

			<form className="group" onSubmit={handleSubmit}>
			<FormInput
					label="Display Name"
					type="text"
					className="form-input"
					name="displayName"
					value={displayName}
					onChange={handleChanges}
					required/>

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
			
				<FormInput
					label="Confirm Password"
					type="password"
					className="form-input"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChanges}
					required/>
				<Button type="submit">Sign Up</Button>
				{invalidPassword ? (
					<span>Passwords do not match with password</span>
				) : null}
			</form>
		</div>
	);
};

export default SignUpForm;
