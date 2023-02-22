'use client'

const btnstyle="w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor"

export default function InititailModal():JSX.Element{
    return(
        <div className=" w-60 p-1 shadow-xl rounded-lg z-90 flex flex-col gap-2 md:fixed left-2/4  lg:left-[76%]   ">
            <button className=" w-full text-sm font-semibold text-gray-600 text-left  p-2 px-3 rounded-md hover:bg-hoverColor">Log in</button>
            <button className={btnstyle}>Sign Up</button>
            <hr />
            <a href="#" className={btnstyle}>Post Property</a>
            <a href="#" className={btnstyle}>Rent Property</a>
            <a href="#" className={btnstyle}>Help</a>
        </div>
    )
}