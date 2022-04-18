import { SignInForm } from "../../components/signin-form/sign-in-form.component";
import SignUpForm from "../../components/signup-form/signup-form.component";
import './authentication.styles.scss';

const Authentication = () => {

    return(
        <div className="auth-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;