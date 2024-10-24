"use client"


import FormContainer from "../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../common/uiLibrary/forms/textField";
import Button from "../../common/uiLibrary/Button";
import ContactInformation from "../../(home)/contactInformation";
import React, {useActionState} from "react";
import FullPage from "../../common/uiLibrary/Layouters/fullPage";
import {postResendConfirmationMail, ResendConfirmationMailRequest} from "./actions";

const ResendConfirmationMail = () => {
    const initialState: ResendConfirmationMailRequest = {
        success: false,
    }

    const [state, formAction] = useActionState(postResendConfirmationMail, initialState);

    const resendForm = () => {
        return (
            <>
                {!state.success && state.error && errorMessage()}

                <TextField
                    id='email'
                    name='email'
                    label='Email'
                    type='email'
                    placeholder='cuban@pete.com'
                    required
                    shadow
                />
                <Button type="submit" className="mt-4 w-full" filled>Submit</Button>
            </>
        )
    }
    const errorMessage = () => {
        return (
            <div className='flex flex-col gap-4'>
                <h3 className="text-lg text-center font-medium text-red-700">Oops!</h3>
                <p>There was an unexpected error while trying to resend the confirmation email.</p>
                <p>Please try again later or contact us.</p>
            </div>
        )
    }

    const successMessage = () => (
        <div className='flex flex-col gap-4'>
            <h3 className="text-lg text-center font-medium text-green-800">Success!</h3>
            <p>Your request has been processed successfully. If your account is found in our system and the email
                address you provided matches our records, we have sent a confirmation email to that address.</p>
            <p>Please check your inbox for the confirmation email. If you don&apos;t receive it within a few minutes, check
                your spam or junk folder. For further assistance, don&apos;t hesitate to contact us.</p>
        </div>
    );

    return (
        <FullPage>
            <div className='flex-grow'>
                <FormContainer action={formAction} title='Resend password confirmation'>
                    {state.success ? successMessage() : resendForm()}
                </FormContainer>
            </div>
            <ContactInformation/>
        </FullPage>
    )
};

export default ResendConfirmationMail;