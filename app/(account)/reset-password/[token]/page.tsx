"use client"


import {useParams} from "next/navigation";
import React, {useActionState} from "react";
import FormContainer from "../../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../../common/uiLibrary/forms/textField";
import Button from "../../../common/uiLibrary/Button";
import {postPasswordReset, ResetPasswordStep2Response} from "./actions";
import {isFieldError} from "../../../../lib/auth/guards";
import FullPage from "../../../common/uiLibrary/Layouters/fullPage";

const ResetPasswordPageStep2 = () => {
    const {token} = useParams<{ token: string }>();
    const initialState: ResetPasswordStep2Response = {
        success: false,
        error: undefined
    }

    const [state, formAction] = useActionState(postPasswordReset, initialState);

    const successMessage = () => (
        <div className='flex flex-col gap-4'>
            <h3 className="text-lg text-center font-medium text-green-800">Success!</h3>
            <p>Your password has been reset successfully.</p>
            <p>You can now log in using your new password.</p>
        </div>
    );

    const errorMessage = () => {
        return (
            <div className='flex flex-col gap-4'>
                <h3 className="text-lg text-center font-medium text-red-700">Oops!</h3>
                <p>There was an error while trying to reset your password. Your password-reset token might be invalid or expired.</p>
                <p>Please try requesting a new password reset or contact us.</p>
            </div>
        )
    }

    const resetPasswordForm = () => {
        return (
            <>
                {state.error && errorMessage()}
                <TextField
                    label='New password'
                    type='password'
                    id='password'
                    name='password'
                    placeholder='********'
                    required
                    shadow
                    helperText={state.error && isFieldError(state.error) && state.error?.error.password &&
                        <div className='text-red-700'>
                            {state.error?.error.password}
                        </div>
                    }
                />

                <TextField
                    label='Confirm your password'
                    type='password'
                    id='password2'
                    name='password2'
                    placeholder='********'
                    required
                    shadow
                    helperText={state.error && isFieldError(state.error) && state.error?.error.password2 &&
                        <div className='text-red-700'>
                            {state.error?.error.password2}
                        </div>
                    }
                />

                <input type='hidden' id='token' name='token' value={token}/>

                <Button type="submit" className="mt-4 w-full" filled>Reset Password</Button>
            </>
        )
    }

    return (
        <FullPage>
            <div className='flex-grow relative'>
                <FormContainer action={formAction} title='Reset your password'>
                    {state.success ? successMessage() : resetPasswordForm()}
                </FormContainer>
            </div>
        </FullPage>
    )
}

export default ResetPasswordPageStep2;