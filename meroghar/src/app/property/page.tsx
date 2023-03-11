import Card from "../../components/card"
import PropertyForm from "../../components/postproperty"

export default function Property(){
    return(
        <main className=" my-20 overflow-hidden w-[95%] mx-auto grid  grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </main>
    )
}