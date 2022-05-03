import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import Widgets from '../../components/Widgets'
import { ArrowLeftIcon } from '@heroicons/react/outline'
function Profile() {
  const { data: session } = useSession()
  const router = useRouter()
  const { username } = router.query
  const usersRef = collection(db, 'users')
  const [account, setAccount] = useState({})
  useEffect(() => {
    if (username) {
      getDocs(query(usersRef, where('username', '==', username))).then(
        (user) => {
          user.forEach((found) => {
            // return found.data().followers.length
            setAccount(found.data())
          })
        }
      )
    }
  }, [username])
  return (
    <div>
      <Head>
        <title>{account?.displayName} on Twitter</title>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        {session && <Sidebar />}
        <div className="max-w-2xl flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
          <div className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-gray-700 bg-black px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]">
            <div
              className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            {account?.username}
          </div>

          <div className="m-5 text-white">
            <img
              src={account?.photoURL}
              className="h-30 w-30 rounded-full"
              alt="profile"
            />
            <h1 className="mt-2 text-[20px] font-bold">
              {account?.displayName}
            </h1>
            <p className="text-[#71767B]">@{account?.username}</p>
            <div className="mt-2 flex w-44 items-center justify-between">
              <div className="flex items-center justify-center">
                <h3 className="font-bold">{account?.followings?.length}</h3>
                <p className="ml-1 text-[15px] text-[#71767B]">Following </p>
              </div>
              <div className="flex items-center justify-center">
                <h3 className="font-bold">{account?.followers?.length}</h3>
                <p className="ml-1 text-[15px] text-[#71767B]">Followers </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
