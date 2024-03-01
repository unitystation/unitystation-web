import React from "react";
import Button from "../../common/uiLibrary/Button";
import AlternativeActions from "../../common/uiLibrary/forms/alternativeActions";
import FormContainer from "../../common/uiLibrary/Layouters/formContainer";
import TextField from "../../common/uiLibrary/forms/textField";
import ContactInformation from "../../(home)/contactInformation";

const LoginPage = () => {
    return (
        <div className='flex flex-col 'style={{minHeight: 'calc(100vh - 60px)'}}>
            <div className='flex-grow'>
                <FormContainer title='Login'>
                    <TextField
                        label='Your email'
                        id='email'
                        type='email'
                        placeholder='cuban@pete.com'
                        required
                        shadow
                    />

                    <TextField
                        label='Your password'
                        id='password'
                        type='password'
                        placeholder='********'
                        required
                        shadow
                    />

                    <Button type="submit" className="mt-4 w-full" filled>Log in</Button>

                    <AlternativeActions
                        links={
                            [
                                {link: '/register', linkText: 'Don\'t have an account?'},
                                {link: '/reset-password', linkText: 'Forgot your password?'}
                            ]
                        }
                    />
                </FormContainer>
            </div>
            <ContactInformation/>
        </div>

    );
}

export default LoginPage;
