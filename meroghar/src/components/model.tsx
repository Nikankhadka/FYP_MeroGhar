'use client'

const btnstyle="w-full text-xs text-gray-700 text-left p-2 px-3 rounded-md hover:bg-blue-100"

export default function InititailModal():JSX.Element{
    return(
        <div className=" w-48 p-1 shadow-xl rounded-lg z-90 flex flex-col gap-1 md:fixed left-2/4  lg:left-3/4  ">
            <button className=" w-full text-xs font-semibold text-gray-700 text-left  p-2 px-3 rounded-md hover:bg-blue-100">Log in</button>
            <button className={btnstyle}>Sign Up</button>
            <hr />
            <a href="#" className={btnstyle}>Post Property</a>
            <a href="#" className={btnstyle}>Rent Property</a>
            <a href="#" className={btnstyle}>Help</a>
        </div>
    )
}