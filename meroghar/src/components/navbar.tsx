'use client';
import Image from "next/image"




 const NavBar=():JSX.Element=>{

    return(
        <nav className="shadow-none md:shadow-md p-2 w-full flex justify-around items-center ">
            {/* logoName */}
            
            <div className=" hidden md:flex items-center gap-1">
            <a href="http://localhost:3000" className="block md:flex items-center gap-1 ">
                <img src="airbnb.png" alt="logo" className="h-9 w-9 block" />
            </a>

            <a href="http://localhost:3000" className="block md:text-sm text-mainColor font-semibold drop-shadow-xl ">MeroGhar
                </a>
            </div>
                
           

            {/* search Bar */}
            <div className="  w-11/12 my-2 border-2 border-gray-200 rounded-lg hover:drop-shadow-md md:w-2/6 h-10 flex items-center bg-white gap-1 ">

            <input type="text" className="w-full h-full px-1 text-sm rounded-lg focus:outline-mainColor shadow-lg"  placeholder="   Search"/>
            <button className=" h-full rounded-lg bg-white px-1 hover:bg-blue-100  "><img src="search.png" alt="search" className="h-6 w-6 " /></button>
            
            </div>
            

           {/* post and Profile */}
            <div className="hidden md:flex items-center gap-2">
            <a href="http://localhost:2900/postRoom" className=" block md:text-xs text-gray-700   p-2 px-3 rounded-md hover:bg-blue-100">Postroom</a>

                <button className="px-2 py-1 rounded-lg  flex items-center gap-1  border-2 border-gray-200 hover:shadow-lg ">
                    <img src="menu.png" alt="user" className="h-4 w-4 "  />
                    <img src="user.png" alt="user" className="h-7 w-7 rounded-full "  />
                </button> 
            </div>
           
        </nav>
    )


}

export default NavBar