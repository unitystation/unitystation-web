'use client';

import {Dropdown, Navbar} from 'flowbite-react';
import React, {useContext} from "react";
import {GoLinkExternal} from "react-icons/go";
import {AuthorizerContext} from "../../context/authorizerContext";

const playerWiki = 'https://wiki.unitystation.org'
const devWiki = 'https://unitystation.github.io/unitystation/'

export default function DefaultNavbar() {
    const {isLoggedIn, authContext, error} = useContext(AuthorizerContext);
    const username = authContext?.account.username;

    return (
        <Navbar fluid rounded className="dark:bg-gray-900">
            <Navbar.Brand/>
            <Navbar.Toggle/>

            <div className="flex md:order-2">
                <Dropdown label={username || 'Account'} color='#1F2937' >
                    {!isLoggedIn && <Dropdown.Item href="/login">Login/register</Dropdown.Item>}
                    {isLoggedIn && <Dropdown.Item>My Account</Dropdown.Item>}
                    {isLoggedIn && <Dropdown.Item href="/logout">Logout</Dropdown.Item>}
                    <Dropdown.Divider/>
                    <Dropdown.Item href="/reset-password">Reset password</Dropdown.Item>
                </Dropdown>
            </div>

            <Navbar.Collapse>
                <Navbar.Link href="/">
                    <p>Home</p>
                </Navbar.Link>
                <Navbar.Link href="/blog">
                    <p>Blog</p>
                </Navbar.Link>
                <Navbar.Link href="/changelog">
                    <p>Changelog</p>
                </Navbar.Link>
                <Navbar.Link href={playerWiki} target="_blank">
                    <div className="flex flex-row gap-1">
                        <p>Player&apos;s wiki</p>
                        <GoLinkExternal/>
                    </div>
                </Navbar.Link>
                <Navbar.Link href={devWiki} target="_blank">
                    <div className="flex flex-row gap-1">
                        <p>Dev&apos;s wiki</p>
                        <GoLinkExternal/>
                    </div>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}


