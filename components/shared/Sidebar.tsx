"use client";

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { link } from 'fs'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button';

const Sidebar = () => {
    const pathname = usePathname();

  return (
    // aside=html tag that means that something is on the side
    <aside className="sidebar">
        <div className="flex size-full flex-col gap-4">

            {/* "/" to point to the homepage */}
            <Link href="/" className="sidebar-logo">
                <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
            </Link>

            {/* Navigation links */}
            {/* Instead of definying all of the links here like: Link1 ... Link 2 and so on..  */}
            {/* We define all of the links in a file called constants */}
            <nav className="sidebar-nav">
                 {/* This will only show if the user is signed in  */}
                <SignedIn>
                    <ul className="sidebar-nav_elements">
                    {/* Map over our nav items coming from constants
                        Inorder to make the list we slice the list to only display the items we want at the top */}
                    {navLinks.slice(0,6).map((link) => {
                        const isActive = link.route === pathname
                        
                        {/* Rendering links */}
                        return (    
                        // if the buttons is active it will have some color else gray
                        <li key={link.route} className={`sidebar-nav_element group ${
                            isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                        }`}>
                            {/* We can then point somewhere by clicking on the link  */}
                            <Link className="sidebar-link" href={link.route}>
                            <Image 
                                src={link.icon}
                                alt="logo"
                                width={24}
                                height={24}
                                className={`${isActive && 'brightness-200'}`}
                            />
                            {link.label}
                            </Link>
                        </li>
                        )
                    })}
                    {/* We close the ul right here to separate the unordered list in two parts */}
                    </ul>

                    <ul className="sidebar-nav_elements">
                        {navLinks.slice(6,).map((link) => {
                            const isActive = link.route === pathname
                            
                            {/* Rendering links */}
                            return (    
                            // if the buttons is active it will have some color else gray
                            <li key={link.route} className={`sidebar-nav_element group ${
                                isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                            }`}>
                                {/* We can then point somewhere by clicking on the link  */}
                                <Link className="sidebar-link" href={link.route}>
                                <Image 
                                    src={link.icon}
                                    alt="logo"
                                    width={24}
                                    height={24}
                                    className={`${isActive && 'brightness-200'}`}
                                />
                                {link.label}
                                </Link>
                            </li>
                            )
                        })}
                            {/*Button to allow us to sign out it aslo gets push to the button of the list  */}
                        <li className="flex-center cursor-pointer gap-2 p-4">
                            <UserButton afterSignOutUrl='/' showName/>
                            
                        </li>
                    </ul>

                </SignedIn>

                {/* Button to sign in if we're signed out */}
                <SignedOut>
                    {/* asChild property to be rendered as a link */}
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in"></Link>
                    </Button>
                    
                </SignedOut>
            </nav>
        </div>
      
    </aside>
  )
}

export default Sidebar
