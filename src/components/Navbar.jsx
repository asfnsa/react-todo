import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";


const Navbar = () => {
    return (
       <nav className='flex justify-between items-center px-4 h-8 sm:h-14 md:h-14 bg-violet-500 shadow-md'>
            {/* Left - Logo and Brand */}
            <div className="flex items-center gap-2">
                <span className="text-white text-[16px] sm:text-lg md:text-xl font-bold">KnowTodo</span>
            </div>

            {/* Right - Menu + Icons */}
            <div className="flex items-center gap-4 sm:gap-2">
                {/* Nav Links */}
                <div className='hidden sm:flex gap-4 text-white font-semibold text-base sm:text-sm'>
                    <span className="cursor-pointer hover:underline">Home</span>
                    <span className="cursor-pointer hover:underline">Contact</span>
                </div>

                {/* Icons */}
                <div className='flex gap-2 text-white text-xl sm:text-lg'>
                    <a href="https://www.instagram.com/anas_asfnsa_/" target="_blank" rel="noopener noreferrer">
                        <AiFillInstagram className='hover:text-black hover:scale-125 transition-all duration-200' />
                    </a>
                    <a href="https://github.com/asfnsa" target="_blank" rel="noopener noreferrer">
                        <FaGithub className='hover:text-black hover:scale-125 transition-all duration-200' />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar