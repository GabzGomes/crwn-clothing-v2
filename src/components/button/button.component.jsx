import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

export const Button = ({children, buttonType, ...otherButtonProps}) => {
    return (
        <button className={`${BUTTON_TYPE_CLASSES[buttonType]} button-container`} {...otherButtonProps}>{children}</button>        
    )
}