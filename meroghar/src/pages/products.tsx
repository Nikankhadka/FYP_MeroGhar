import Card from "../components/card";

export default function Products(){

    return(
        <main className="w-full">
        <main className=" mx-auto grid  grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </main>
        </main>
      
    )
}