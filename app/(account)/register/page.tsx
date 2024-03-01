import React from "react";
import Button from "../../common/uiLibrary/Button";
import FormContainer from "../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../common/uiLibrary/forms/textField";
import AlternativeActions from "../../common/uiLibrary/forms/alternativeActions";
import ContactInformation from "../../(home)/contactInformation";

const RegisterPage = () => {
    return (

        <div className='flex flex-col ' style={{minHeight: 'calc(100vh - 60px)'}}>
            <div className='flex-grow'>
                <FormContainer title='Create a new account'>
                    <TextField
                        label='Your email'
                        id='email'
                        type='email'
                        placeholder='cuban@pete.com'
                        shadow
                    />

                    <TextField
                        label='Your unique identifier'
                        id='unique_identifier'
                        type='text'
                        placeholder='YourUniqueID'
                        required
                        shadow
                        helperText={
                            <>
                                Choose a unique identifier for your account. <b>This identifier is permanent
                                and cannot be changed later</b>. Please choose carefully!
                            </>}
                    />

                    <TextField
                        label='Username'
                        id='username'
                        type='text'
                        placeholder='YourUsername'
                        required
                        shadow
                        helperText={
                            <>
                                Choose a username that will be displayed to other users. This can be changed
                                later.
                            </>}
                    />

                    <TextField
                        label='Your password'
                        id='password'
                        type='password'
                        placeholder='********'
                        shadow
                        required
                    />

                    <TextField
                        label='Confirm your password'
                        id='password2'
                        type='password'
                        placeholder='********'
                        shadow
                        required
                    />

                    <Button type="submit" className="mt-4 w-full" filled>Register</Button>

                    <AlternativeActions
                        links={[
                            {link: '/login', linkText: 'Already have an account?'}
                        ]}
                    />
                </FormContainer>
            </div>
            <ContactInformation/>
        </div>
    );
}

export default RegisterPage;
