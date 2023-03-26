import Profile from "../../../../components/user/profile"
import UserCard from "../../../../components/user/userCard"

export default function KycRequest(){
   return(
    <main  className="ml-0 my-20 border-2 border-red-600 md:ml-[230px] md:my-10 lg:ml-[260px]">
    <div className="w-full p-2 mx-auto my-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
    <UserCard />
    <UserCard />
    <UserCard />
    <UserCard />
    <UserCard />
    </div>
    </main>
   )
}