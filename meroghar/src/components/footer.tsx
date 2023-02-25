'use client'

import Link from "next/link"
import Image from 'next/legacy/image'
import { Search } from "./svgs"

export default function Footer(){
    return(
        <footer className="w-full fixed bottom-0 border-2 border-gray-200 p-3 flex justify-around md:hidden">
            <FooterChild url="http://localhost:3000" img='/search.png' text="Search" />
            <FooterChild url="http://localhost:3000" img='/search.png' text="Search" />
            <FooterChild url="http://localhost:3000" img='/search.png' text="Search" />
            <FooterChild url="http://localhost:3000" img='/search.png' text="Search" />
            <FooterChild url="http://localhost:3000" img='/search.png' text="Search" />
        </footer>
    )
}


interface footerprops{
    url:string,
    img:string,
    text:string
}

function FooterChild({url,img,text}:footerprops){
        return(
            <Link href={url} className=' text-xs  flex flex-col gap-2'>
                <Search  className='text-red-600'/>
                <span>{text}</span>
            </Link>
        )
}