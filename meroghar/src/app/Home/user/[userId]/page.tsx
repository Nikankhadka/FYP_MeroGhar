import Profile from '../../../../components/user/profile'
import { getUser } from '../../../../api/server/user/getUser'
import { checkSession } from '../../../../api/server/auth'
import ClientComp from '../../../../components/clientComp'
import { getMyProperties } from '../../../../api/server/property/getProperty'
type Params = {
  params: {
    userId: string
  }
}

export default async function UserProfile({ params: { userId } }: Params) {
  const userProfileData = await getUser(userId)
  const { session, userData } = await checkSession()
  const listings=await getMyProperties(userId,1,5)

  return (
    <ClientComp>
      <main className="mx-auto  rounded-lg  w-[98%] sm:w-[90%] lg:w-[80%]">
        <Profile
          userId={session ? userData.userId : ''}
          profileData={userProfileData}
          is_Admin={userData.is_Admin}
          listings={listings}
        />
      </main>
    </ClientComp>
  )
}
