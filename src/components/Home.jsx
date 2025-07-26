import React from 'react'
import logo from '/logo.svg'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className='w-auto h-screen flex justify-center items-center bg-violet-200'>
            <div className='flex flex-col justify-center items-center gap-3.5'>
                <div className='flex gap-2.5 justify-center items-center '>
                    <img src={logo} alt="React Logo " className='h-[10vh] md:h-[30vh]' />

                    <p className='text-4xl sm:text-7xl md:text-9xl text-white font-bold'>knowTodo</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-1 text-center'>
                    <p className='text-[12px] font-bold sm:text-2xl md:text-3xl text-white'>Your Personal Task Manager</p>
                    <p className='text-[10px] font-semibold sm:text-lg md:text-xl text-white'>Organize your tasks effortlessly</p>
                </div>
                <NavLink to="/react-todo/start">
                <div className="relative inline-flex items-center justify-center group">
                    {/* 🔥 Gradient Glow Background on Hover/Tap */}
                    <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-80 group-focus:opacity-100 group-active:opacity-100 group-hover:duration-500"></div>

                    {/* 🟣 Gradient Text Button */}
                    <button
                        className="group relative inline-flex items-center justify-center 
      text-transparent bg-clip-text 
      bg-gradient-to-r from-[#e6dded] to-[#f79dca] 
      text-base sm:text-2xl md:text-[32px] 
      rounded-xl bg-gray-900 
      px-[4vw] py-2.5 md:py-6 md:px-[8vw] 
      font-bold 
      transition-all duration-300 
      hover:bg-gray-800 hover:shadow-lg hover:-translate-y-2 
      hover:shadow-gray-600/30"
                    >
                        Get Started

                        {/* 🔁 Arrow Icon with hover animation */}
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 10 10"
                            height="10"
                            width="10"
                            fill="none"
                            className="mt-0.5 ml-2 md:h-[20px] md:w-[20px] -mr-1 stroke-white stroke-2"
                        >
                            <path
                                d="M0 5h7"
                                className="transition opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100"
                            ></path>
                            <path
                                d="M1 1l4 4-4 4"
                                className="transition group-hover:translate-x-[3.5px] group-focus:translate-x-[3.5px] group-active:translate-x-[5px]"
                            ></path>
                        </svg>
                    </button>
                </div>
            </NavLink>

        </div>
        </div >
    )
}

export default Home