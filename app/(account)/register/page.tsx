"use client"

import React from "react";
import Button from "../../common/uiLibrary/Button";
import FormContainer from "../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../common/uiLibrary/forms/textField";
import AlternativeActions from "../../common/uiLibrary/forms/alternativeActions";
import ContactInformation from "../../(home)/contactInformation";
import {useFormState} from "react-dom";
import {registerAccount, RegisterResponse} from "./actions";
import {isFieldError} from "../../../lib/auth/guards";
import { useFormStatus } from "react-dom";
import GenericLoading from "../../common/uiLibrary/genericLoading";

const RegisterPage = () => {

    const initialState: RegisterResponse = {
        success: false,
        error: undefined
    }
    const [state, formAction] = useFormState(registerAccount, initialState);

    const uniqueIdHelperText = () =>
        <>
            Choose a unique identifier for your account. <b>This identifier is permanent
            and cannot be changed later</b>. Please choose carefully!
        </>

    const usernameHelperText = () =>
        <>
            Choose a username that will be displayed to other users. This can be changed
            later.
        </>

    const registerForm = () => {
        return (
            <>
                <TextField
                    label='Your email'
                    id='email'
                    name='email'
                    type='email'
                    placeholder='cuban@pete.com'
                    shadow
                    helperText={(state.error && isFieldError(state.error) && state.error?.error.email) ?
                        <div className='text-red-700'>
                            {state.error?.error.email}
                        </div>
                        :
                        usernameHelperText()
                    }
                />

                <TextField
                    label='Your unique identifier'
                    id='unique_identifier'
                    name='unique_identifier'
                    type='text'
                    placeholder='YourUniqueID'
                    required
                    shadow
                    helperText={(state.error && isFieldError(state.error) && state.error?.error.unique_identifier) ?
                    <div className='text-red-700'>
                        {state.error?.error.unique_identifier}
                    </div>
                        :
                        uniqueIdHelperText()
                    }
                />

                <TextField
                    label='Username'
                    id='username'
                    name='username'
                    type='text'
                    placeholder='YourUsername'
                    required
                    shadow
                    helperText={(state.error && isFieldError(state.error) && state.error?.error.username) ?
                        <div className='text-red-700'>
                            {state.error?.error.username}
                        </div>
                        :
                        usernameHelperText()
                    }
                />

                <TextField
                    label='Your password'
                    id='password'
                    name='password'
                    type='password'
                    placeholder='********'
                    shadow
                    required
                    helperText={ state.error && isFieldError(state.error) && state.error?.error.password &&
                        <div className='text-red-700'>
                            {state.error?.error.password}
                        </div>
                    }
                />

                <TextField
                    label='Confirm your password'
                    id='password2'
                    name='password2'
                    type='password'
                    placeholder='********'
                    shadow
                    required
                    helperText={(state.error && isFieldError(state.error) && state.error?.error.password2) &&
                        <div className='text-red-700'>
                            {state.error?.error.password2}
                        </div>
                    }
                />

                <Button type="submit" className="mt-4 w-full" filled>Register</Button>

                <AlternativeActions
                    links={[
                        {link: '/login', linkText: 'Already have an account?'}
                    ]}
                />
            </>
        )
    }
    const successMessage = () => {
        return (
            <div className='flex flex-col gap-4'>
                <h3 className="text-lg text-center font-medium text-green-800">Success!</h3>
                <p>An email has been sent with instructions to confirm your account.</p>
                <p>Please check your inbox and follow the instructions to complete the process.</p>
                <p>Didn&apos;t receive the email? Check your Spam folder or try resending the email. Ensure your email
                    address is
                    entered correctly.</p>
            </div>
        )
    }

    const FormOrLoading = () => {
            const {pending} = useFormStatus();
            if (pending) {
                return (
                    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70 z-10'>
                        <GenericLoading/>
                        Loading...
                    </div>
                )
            } else {
                return registerForm()
            }
    }

    return (
        <div className='flex flex-col ' style={{minHeight: 'calc(100vh - 60px)'}}>

            <div className='flex-grow'>
                <FormContainer action={formAction} title='Create a new account'>
                    {state.success ? successMessage() : FormOrLoading()}
                </FormContainer>
            </div>
            <ContactInformation/>
        </div>
    );
}

export default RegisterPage;
