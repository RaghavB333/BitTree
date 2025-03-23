"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import Image from 'next/image';

const Navbar = () => {

    const pathName = usePathname()
    const showNavbar=["/","/generate"].includes(window.location.pathname)

    return (
        <>{showNavbar && <div>
            <nav className='bg-white w-[80vw] fixed top-10 right-[10vw] rounded-full p-5 px-7 flex justify-between'>
                <div className="logo flex gap-20 items-center">
                    <Link href={"/"}>
                        <Image src="/BitTree.png" width={255} height={155} alt={""} unoptimized={true}/>
                        
                    </Link>
                    <ul className='flex gap-10'>
                        <li>Templates</li>
                        <li>Marketplace</li>
                        <li>Discover</li>
                        <li>Pricing</li>
                        <li>Learn</li>
                    </ul>
                </div>
                <div className='flex gap-3'>
                    <button className="login bg-gray-300 p-4 rounded-lg font-bold">Login</button>
                    <button className="signup bg-gray-900 text-white p-4 rounded-full font-bold">Signup Free</button>
                </div>
            </nav>
        </div>}</>
    )
}

export default Navbar
