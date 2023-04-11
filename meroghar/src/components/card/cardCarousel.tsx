'use client'

import Card from "./card"


export default function CardCarousel(){
    return(
    <main className="w-full ">
        <div className="w-full mx-auto my-3 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
    </main>
        
    )
}