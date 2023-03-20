import Profile from "../../../components/profile"

type Params = {
    params: {
      userId: string
    }
  }
  
  export default function Room({ params: { userId } }: Params) {
    return(
        <main className="my-20 w-full">
            userProfile here
            <Profile />
        </main>
    )

}