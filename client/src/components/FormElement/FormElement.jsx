import './FormElement.css'

const FormElement = ({value, name, title, type = 'text', validationErrors, showingErrors}) => {
    
    const doNothing = () => {}
    return (
        <div className="cont-input">

            <label htmlFor={`form-${name}`}>{title}</label>

            <input type={type} name={name} id={`form-${name}`} 
                placeholder={title} value={value} onChange={doNothing}/>
            
            {(showingErrors && validationErrors[name]) &&
                <div className="validation-error">{validationErrors[name]}</div>}

        </div>
    )
}

export default FormElement
