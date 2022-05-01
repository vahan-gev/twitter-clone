import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { auth, db } from '../firebase'

function Login({ providers }) {
  // const router = useRouter()
  // const createAccount = (email, password, username, name, surname) => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       setDoc(doc(db, 'users', userCredential.user.uid), {
  //         uid: userCredential.user.uid,
  //         username: username,
  //         password: password,
  //         displayName: name + ' ' + surname,
  //         photoURL:
  //           'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
  //       })
  //       updateProfile(userCredential.user, {
  //         displayName: name + ' ' + surname,
  //         photoURL:
  //           'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
  //       })
  //       console.log(userCredential.user)
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       console.log(errorCode + errorMessage)
  //     })
  // }
  // createAccount(
  //   'vahangevorgyan0212@gmail.com',
  //   'vahan2004',
  //   'vahan_gev',
  //   'Vahan',
  //   'Gevorgyan'
  // )

  // const signIn = async () => {
  //   await signInWithEmailAndPassword(
  //     auth,
  //     'vahangevorgyan0212@gmail.com',
  //     'vahan2004'
  //   ).then((user) => {
  //     console.log(auth.currentUser)
  //     router.push('/')
  //   })
  // }
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Head>
        <title>Login / Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />

      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <a
              onClick={() => {
                signIn(provider.id, { callbackUrl: '/' })
                // signIn()
              }}
              className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md px-6 py-3 font-bold text-white shadow-2xl"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 opacity-0 transition duration-300 ease-out group-hover:opacity-100"></span>
              <span className="absolute top-0 left-0 h-1/3 w-full bg-gradient-to-b from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 h-full w-full rounded-md border border-white opacity-10"></span>
              <span className="absolute h-0 w-0 rounded-full bg-white opacity-5 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
              <span className="relative">Sign in with {provider.name}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login
