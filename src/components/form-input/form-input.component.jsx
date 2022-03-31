import './form-input.styles.scss';

export const FormInput = ({label, ...inputProps}) => {
    return (
        <div className="group">
            <input className="form-input" {...inputProps}/>
            { label && (
                <label 
                    className={`${inputProps.value ? 'shrink' : ''} form-input-label`}> 
                    {label}
                </label>
            )}            
        </div>
    );
}