'use client';

import {Dropdown, Navbar} from 'flowbite-react';
import React, {useContext} from "react";
import {GoLinkExternal} from "react-icons/go";
import {AuthorizerContext} from "../../context/AuthorizerContextProvider";
import Link from "next/link";


const playerWiki = 'https://wiki.unitystation.org'
const devWiki = 'https://unitystation.github.io/unitystation/'

export default function DefaultNavbar() {
    const {state} = useContext(AuthorizerContext);
    const username = state.authContext?.account.username;

    const loggedOptions = () => (
        <>
            {/* hidden while we work on it */}
            {/*<Dropdown.Item>My Account</Dropdown.Item>*/}
            <Dropdown.Item>
                <Link href='/logout'>Logout</Link>
            </Dropdown.Item>
        </>
    )

    const notLoggedOptions = () => (
        <>
            <Dropdown.Item>
                <Link href='/login'>Login/Register</Link>
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item>
                <Link href='/reset-password'>Reset password</Link>
            </Dropdown.Item>
        </>
    )

    return (
        <Navbar fluid rounded className="dark:bg-gray-900">
            <Navbar.Brand/>
            <Navbar.Toggle/>

            <div className="flex md:order-2">
                <Dropdown label={username || 'Account'} color='#1F2937'>
                    {state.isLoggedIn ? loggedOptions() : notLoggedOptions()}
                </Dropdown>
            </div>

            <Navbar.Collapse>
                <Link href='/'>
                    <p>Home</p>
                </Link>
                <Link href='/blog'>
                    <p>Blog</p>
                </Link>
                <Link href='/changelog'>
                    <p>Changelog</p>
                </Link>
                <Link href='/ledger'>
                    <p>Ledger</p>
                </Link>
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
