'use client'

import Button from "../../common/uiLibrary/Button";
import React from "react";
import FormContainer from "../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../common/uiLibrary/forms/textField";
import {resendMailConfirmationToken, ResendMailResponse} from "./actions";
import {useFormState} from "react-dom";
import ContactInformation from "../../(home)/contactInformation";

const initialState: ResendMailResponse = {
    success: false,
    message: undefined,
    email: ''
};

const ResetPasswordPage = () => {
    const [state, formAction] = useFormState(resendMailConfirmationToken, initialState);

    const successMessage = () => (
        <div className='flex flex-col gap-4'>
            <h3 className="text-lg text-center font-medium text-green-800">Success!</h3>
            <p>An email has been sent with instructions to reset your password.</p>
            <p>Please check your inbox and follow the instructions to complete the process.</p>
            <p>Didn&apos;t receive the email? Check your Spam folder or try resending the email. Ensure your email address is
                entered correctly.</p>
        </div>
    );

    const errorMessages = () => {
        return (
            <div className='flex flex-col gap-4'>
                <h3 className="text-lg text-center font-medium text-red-700">Oops!</h3>
                <p>There was an unexpected error while trying to reset your password.</p>
                <p>Please try again later or contact us.</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col ' style={{minHeight: 'calc(100vh - 60px)'}}>
            <div className='flex-grow'>
                <FormContainer action={formAction} title='Reset Password'>
                    {state.success ? successMessage() : state.message && errorMessages()}

                    <TextField
                        id='email'
                        name='email'
                        label='Email'
                        type='email'
                        placeholder='cuban@pete.com'
                        required
                        shadow
                        helperText={ state.fieldErrors?.email &&
                        <div className='text-red-700'>
                            {state.fieldErrors?.email}
                        </div>
                    }
                    />
                    <Button type="submit" className="mt-4 w-full" filled>Submit</Button>
                </FormContainer>
            </div>
            <ContactInformation/>
        </div>
    )
}

export default ResetPasswordPage;