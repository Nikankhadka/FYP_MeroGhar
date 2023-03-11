'use client';
import Image from "next/image"
import { useState,useEffect,useRef } from "react";
import InititailModalC from "./navmodel";
import InititailModal from "./navmodel";

import { createRef } from "react";
import { ToggleButton } from "./buttons";

interface NavProps{
    theme:string
}
 const NavBar=({theme}:NavProps):JSX.Element=>{
    //get auth state and pass into the initial model
    const[open,setopen]=useState(false)

    //ref obj/e obj for menu we doing this since we forwarding the ref
    const menuRef=createRef<HTMLDivElement>()
    
    useEffect(()=>{
        const clickHandler=(e:any)=>{
            //if event click is outsise the div ref of the modal clsoe modal
            if(!menuRef.current?.contains(e.target)){
                setopen(false)
            }}
        document.addEventListener('mousedown',clickHandler);

        return()=>{
            document.removeEventListener('mousedown',clickHandler);
        }
    })


    return(
        <nav className=" fixed z-50 bg-white shadow-none md:shadow-md p-3 w-full h-20 flex justify-around items-center ">
            {/* logoName */}
            
            <div className=" hidden md:flex items-center gap-1">
            <a href="http://localhost:3000" className="block md:flex items-center gap-2 ">
                <img src="airbnb.png" alt="logo" className="h-10 w-10 block" />
            </a>

            <a href="http://localhost:3000" className="block md:text-lg text-mainColor font-semibold drop-shadow-xl ">MeroGhar
                </a>
            </div>
                
           

            {/* search Bar */}
            <div className="  w-11/12 my-2 border-2 border-gray-200 rounded-lg hover:drop-shadow-md md:w-2/6 h-11 flex items-center bg-white gap-1 ">

            <input type="text" className="w-full h-full p-2 text-md rounded-lg focus:outline-mainColor shadow-lg"  placeholder="   Search"/>
            <button className=" h-full rounded-lg bg-white px-1 hover:bg-blue-100  "><img src="search.png" alt="search" className="h-6 w-6 " /></button>
            
            </div>
            

           {/* post and Profile */}
        <div className="hidden md:flex items-center gap-2">
             <ToggleButton  theme={theme}/>
            <a href="http://localhost:2900/postRoom" className=" block md:text-sm text-gray-700   p-2 px-3 rounded-md hover:bg-hoverColor">Postroom</a>

                <div>
                <button className="px-2 py-1 rounded-lg  flex items-center gap-1  border-2 border-gray-200 hover:shadow-lg " onClick={(e)=>setopen(!open)}>
                    <img src="menu.png" alt="user" className="h-5 w-5 "  />
                    <img src="user.png" alt="user" className="h-8 w-8 rounded-full "  />
                </button> 

               {
                open&&<InititailModalC authState={false} ref={menuRef}/>
               }
            </div>
               

        </div>
        
        </nav>
    )


}

export default NavBar