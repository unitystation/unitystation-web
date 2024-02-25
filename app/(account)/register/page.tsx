import Container from "../../common/uiLibrary/container";
import {TextInput, Label} from "flowbite-react";
import React from "react";
import Button from "../../common/uiLibrary/Button";
import Panel from "../../common/uiLibrary/panel";

const LoginPage = () => {
    return (
        <Container>
            <div className="flex items-start justify-center min-h-screen pt-20 md:pt-32">
                <Panel className='flex h-full max-w-md'>
                    <div className="flex flex-col gap-4 p-4 w-full">
                        <h2 className="text-center text-2xl font-bold">Create a new account</h2>

                        <form className="flex flex-col gap-4 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email"/>
                                </div>
                                <TextInput
                                    className='w-full' id="email" type="email" placeholder="name@domain.com"
                                    required shadow
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="unique_identifier" value="Your unique identifier"/>
                                </div>
                                <TextInput
                                    className='w-full' id="unique_identifier" type="text"
                                    placeholder="YourUniqueID"
                                    required shadow
                                    helperText={
                                        <>
                                            Choose a unique identifier for your account. <b>This identifier is permanent
                                            and cannot be changed later</b>. Please choose carefully!
                                        </>}/>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="username" value="Username"/>
                                </div>
                                <TextInput
                                    className='w-full' id="username" type="text"
                                    placeholder="YourUsername"
                                    required shadow
                                    helperText={
                                        <>
                                            Choose a username that will be displayed to other users. This can be changed
                                            later.
                                        </>}/>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password"/>
                                </div>
                                <TextInput className='w-full' id="password" type="password" required shadow/>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password2" value="Confirm your password"/>
                                </div>
                                <TextInput className='w-full' id="password2" type="password" required shadow/>
                            </div>

                            <Button type="submit" className="mt-4 w-full" filled>Register</Button>

                        </form>

                        <div className="text-center">
                            <a href="/login"
                               className="text-sm text-gray-500 hover:text-blue-600 hover:underline">
                                Already have an account?
                            </a>
                        </div>
                    </div>
                </Panel>
            </div>
        </Container>
    );
}

export default LoginPage;
