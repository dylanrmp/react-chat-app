import React, {useEffect, useState} from 'react';

export const Registration = ({ setIsRegistering }) => {
    const [displayName, setDisplayName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isDisplayNameValid, setIsDisplayNameValid] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)

    const [ displayNameValidationMessage, setDisplayNameValidationMessage ] = useState('')
    const [ usernameValidationMessage, setUsernameValidationMessage ] = useState('')
    const [ passwordValidationMessage, setPasswordValidationMessage ] = useState('')
    const [ confirmPasswordValidationMessage, setConfirmPasswordValidationMessage ] = useState('')

    const [ canRegister, setCanRegister ] = useState(false)

    const hasSpecialCharacters = (str) => {
        return /[^a-zA-Z0-9 ]/.test(str);
    }

    const isWithinLength = (str, min, max) => {
        return str.length >= min && str.length <= max;
    }

    const isEmpty = (str) => {
        return str.length === 0;
    }

    const isNameValid = (name) => {
        return isEmpty(name) === false
            && hasSpecialCharacters(name) === false
            && isWithinLength(name, 6, 30)
    }

    useEffect(() => {
        setIsDisplayNameValid(isNameValid(displayName))

        if (isEmpty(displayName))
            setDisplayNameValidationMessage(null)

        else if (isWithinLength(displayName, 6, 30) === false)
            setDisplayNameValidationMessage('Your display name must be between 6 and 30 characters')

        else if (hasSpecialCharacters(displayName))
            setDisplayNameValidationMessage('Your display name should not contain any special characters')

        else
            setDisplayNameValidationMessage(null)

    }, [displayName]);

    useEffect(() => {
        setIsUsernameValid(isNameValid(username))

        if (isEmpty(username))
            setUsernameValidationMessage(null)

        else if (isWithinLength(username, 6, 30) === false)
            setUsernameValidationMessage('Your username name must be between 6 and 30 characters')

        else if (hasSpecialCharacters(username))
            setUsernameValidationMessage('Your username name should not contain any special characters')

        else
            setUsernameValidationMessage(null)

    }, [username])

    useEffect(() => {
        const lowercase = /(?=.*[a-z])/;
        const uppercase = /(?=.*[A-Z])/;
        const digit = /(?=.*\d)/;
        const specialCharacter = /(?=.*[\W_])/;
        const lengthRequirement = /.{12,}/;

        if (isEmpty(password))
            setPasswordValidationMessage(null)

        else if (lowercase.test(password) === false)
            setPasswordValidationMessage('Your password must contain at least one lowercase character')

        else if (uppercase.test(password) === false)
            setPasswordValidationMessage('Your password must contain at least one uppercase character')

        else if (digit.test(password) === false)
            setPasswordValidationMessage('Your password must contain at least one digit character')

        else if (specialCharacter.test(password) === false)
            setPasswordValidationMessage('Your password must contain at least one special character')

        else if (lengthRequirement.test(password) === false)
            setPasswordValidationMessage('Your password must be at least 12 characters long')

        else
            setPasswordValidationMessage(null)

        const fullRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/
        const isValid = fullRegex.test(password)
        setIsPasswordValid(isValid)

    }, [password]);

    useEffect(() => {
        if (isEmpty(confirmPassword)){
            setIsConfirmPasswordValid(false)
            setConfirmPasswordValidationMessage('')

        } else {
            if (password === confirmPassword){
                setIsConfirmPasswordValid(true)

            } else {
                setIsConfirmPasswordValid(false)
                setConfirmPasswordValidationMessage('This password must match the password above')
            }
        }
    }, [confirmPassword, password]);

    useEffect(() => {
        const canRegister =
            isDisplayNameValid &&
            isUsernameValid &&
            isPasswordValid &&
            isConfirmPasswordValid

        setCanRegister(canRegister)

    }, [isDisplayNameValid, isUsernameValid, isPasswordValid, isConfirmPasswordValid]);

    const test = (e) => {
        e.preventDefault()

        const canRegister = isDisplayNameValid
        && isUsernameValid
        && isPasswordValid
        && isConfirmPasswordValid

        if (canRegister){
            // Send form to API
            // Server side validation
            // return OK response
            // login
            // return Bad response
            // show user which field is wrong
            // prompt user to try again
        }
    }

    return (
        <>
            <div className="register-flex-container">

                <div className="register-container">

                    <h2 className="register-header">Create an account</h2>

                    <form onSubmit={test}>
                        <div className="input-container">
                            <label>DISPLAY NAME</label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>

                        <div className="validation-message">{displayNameValidationMessage}</div>

                        <div className="input-container">
                            <label>USERNAME</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {isUsernameValid ? null : <div className="validation-message">{usernameValidationMessage}</div>}

                        <div className="input-container">
                            <label>PASSWORD</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {isPasswordValid ? null : <div className="validation-message">{passwordValidationMessage}</div>}

                        <div className="input-container">
                            <label>CONFIRM PASSWORD</label>
                            <input
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {isConfirmPasswordValid ? null : <div className="validation-message">{confirmPasswordValidationMessage}</div>}

                        <button className={canRegister ? 'enabled' : 'disabled'} type="submit">REGISTER</button>
                    </form>

                    <p className="login-paragraph" onClick={() => setIsRegistering(false)}>Already have an account?</p>
                </div>

            </div>
        </>
    )
}