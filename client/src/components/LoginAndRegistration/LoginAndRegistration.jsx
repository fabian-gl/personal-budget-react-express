import './LoginAndRegistration.css'

import { useHistory } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'

import { GlobalContext } from '../../context/GlobalState'
import FormElement from '../FormElement/FormElement';


const LoginAndRegistration = () => {

    const history = useHistory()

    const { userLogin, userRegister } = useContext(GlobalContext);

    const [isRegistration, setIsRegistration] = useState(false)
    
    const [formElements, setFormElements] = useState([])

    const [btnEnabled, setBtnEnabled] = useState(false)

    const [validationErrors, setValidationErrors] = useState({})

    const [showingErrors, setShowingErrors] = useState(false)

    useEffect(() => {

        const arrayInputNames = (isRegistration ? 
            ['name', 'email', 'password', 'repeatPassword'] :
            ['email', 'password'])

        setFormElements(createFormElementsObjects(arrayInputNames))
        
    }, [isRegistration])

    useEffect(() => {
        const emptyObject = formElements.reduce((acum, act) => ({...acum, [act.name]: ''}),{})
        
        setValidationErrors({...emptyObject})
        setBtnEnabled(validateInputs())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formElements])


    const validateInputs = () => {

        const validationObject = {}

        formElements.forEach((elem, index) =>
        {
            const key = elem.name
            const value = elem.value

            if (key === 'name') {
                if (!value.length) validationObject[key] = 'Please enter a name'
                else if (value.length < 3) validationObject[key] = 'Name must have at least 3 characters'
            
            } else if (key === 'email') {
                if (!value.length) validationObject[key] = 'Please enter an email'
                else {
                    const re = /\S+@\S+\.\S+/
                    if (!re.test(value)) validationObject[key] = 'The email is not valid'
                }
        
            } else if (key === 'password') {
                if (!value.length) validationObject[key] = 'Please enter a password'
                else if (value.length < 6) validationObject[key] = 'The password must be at least of 6 characters'

            } else if (key === 'repeatPassword' && value !== formElements[index - 1].value) {
                validationObject[key] = 'Passwords do not match'
        
            }
        })

        setValidationErrors(validationObject)

        // Check if any field is not valid
        for (const key in validationObject) if (validationObject[key]) return false
        return true
    }

    const handleChange = e => {

        const newArray = Array.from(formElements)
        const index = newArray.findIndex(elem => elem.name === e.target.name)
        newArray[index].value = e.target.value

        setFormElements(newArray)
    }

    const handleSubmit = async () => {
        if (validateInputs())
        {
            const userData = formElements.reduce((acum, act) => ({...acum, [act.name]: act.value}),{})

            if (isRegistration)
            {
                const registrationOk = await userRegister(userData)
                if (registrationOk) 
                {
                    setIsRegistration(false)
                    setShowingErrors(false)
                }
            }
            else 
            {
                const loginOk = await userLogin(userData)
                console.log(loginOk)
                if (loginOk) history.push('/')
            }
        }
        else setShowingErrors(true)
    }

    const toggleRegistration = () => {
        setShowingErrors(false)
        setIsRegistration(!isRegistration)
    }


    return (
        <div className='cont-login-registration'>
            { isRegistration ?
                <h2>Let's create a new user</h2>
            :
                <h2>Use your credentials to enter the system</h2>
            }
            <form className='form-user' onChange={handleChange}>
                { formElements.map((elem, i) => 
                    <FormElement key={i} {...elem}
                        validationErrors={validationErrors} 
                        showingErrors={showingErrors}
                />) }
            </form>

            <button className={`btn-submit ${btnEnabled && 'enabled'}`} onClick={handleSubmit}>{(isRegistration ? "Sign up" : "Log in")}</button>
            
            <div className="cont-change-form">
                <p>{(isRegistration ? "Wanted to log in instead?" : "Don't have an account yet?")}</p>
                <button onClick={toggleRegistration}>{(isRegistration ? 'Go to log in form' : 'Sign up')}</button>
            </div>
        </div>
    )
}

export default LoginAndRegistration


function createFormElementsObjects(arrayOfFormElementNames)
{
    const allPossibleObjects = {
        name: {
            title: 'Name',
            type: 'text'
        },
        email: {
            title: 'Email',
            type: 'email'
        },
        password: {
            title: 'Password',
            type: 'password'
        },
        repeatPassword: {
            title: 'Repeat password',
            type: 'password'
        },   
    }

    return arrayOfFormElementNames.map(elemName => 
        ({
            ...allPossibleObjects[elemName], 
            name: elemName, 
            value: ''
        }))
}