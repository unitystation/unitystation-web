"use client"

import React, {useContext, useEffect, useState} from "react";
import Button from "../../common/uiLibrary/Button";
import AlternativeActions from "../../common/uiLibrary/forms/alternativeActions";
import FormContainer from "../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../common/uiLibrary/forms/textField";
import ContactInformation from "../../(home)/contactInformation";

import {AuthorizerContext} from "../../../context/AuthorizerContextProvider";
import {isFieldError, isGeneralError} from "../../../lib/auth/guards";
import GenericLoading from "../../common/uiLibrary/genericLoading";
import {redirect} from "next/navigation";

const LoginPage = () => {
    const {state, credentialsLogin} = useContext(AuthorizerContext);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (state.isLoggedIn) {
            redirect('/');
        }
    }, [state.isLoggedIn])

    const handleSubmit = async () => {
        setIsLoading(true);
        await credentialsLogin(email, password);
        setIsLoading(false);
    }

    const errorMessage = (message: string) => {
        return (
            <div className='flex flex-col p-4 gap-4'>
                <h3 className="text-lg text-center font-medium text-red-700">Oops!</h3>
                <p>{message}</p>
            </div>
        )
    }

    const loginForm = () => {
        return (
            <div className='flex flex-col' style={{minHeight: 'calc(100vh - 60px)'}}>
                <div className='flex-grow relative'>
                    {isLoading &&
                        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70 z-10'>
                            <GenericLoading/>
                            Loading...
                        </div>
                    }
                    <FormContainer action={handleSubmit} title='Login'>
                        {state.error && isGeneralError(state.error) && errorMessage(state.error.error)}

                        <TextField
                            value={email}
                            label='Your email'
                            type='email'
                            placeholder='cuban@pete.com'
                            required
                            shadow
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            helperText={state.error && isFieldError(state.error) && state.error.error.email &&
                                <div className='text-red-700'>{state.error.error.email}</div>
                            }
                        />

                        <TextField
                            value={password}
                            label='Your password'
                            id='password'
                            type='password'
                            placeholder='********'
                            required
                            shadow
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            helperText={state.error && isFieldError(state.error) && state.error.error.password &&
                                <div className='text-red-700'>{state.error.error.password}</div>
                            }
                        />

                        <Button type='submit' className="mt-4 w-full" filled>Log in</Button>

                        <AlternativeActions
                            links={
                                [
                                    {link: '/register', linkText: 'Don\'t have an account?'},
                                    {link: '/reset-password', linkText: 'Forgot your password?'},
                                    {link: '/resend-confirmation-email', linkText: 'Haven\'t received confirmation email yet?'},
                                ]
                            }
                        />
                    </FormContainer>
                </div>
                <ContactInformation/>
            </div>
        )
    }

    return !state.isLoggedIn && loginForm();
}

export default LoginPage;
