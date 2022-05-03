import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../../../firebase'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // session.user.tag =
      await getDoc(doc(db, 'users', session.user.email))
        .then((user) => {
          session.user.tag = user.data().username
          session.user.followers = user.data().followers
          session.user.followings = user.data().followings
        })
        .catch((error) => {
          let username =
            session.user.name.split(' ').join('').toLocaleLowerCase() +
            Math.floor(Math.random() * 20000000)
          setDoc(doc(db, 'users', session.user.email), {
            uid: token.sub,
            username: username,
            followers: [],
            followings: [],
            displayName: session.user.name,
            photoURL: session.user.image,
          })
          session.user.tag = username
          session.user.followers = 0
          session.user.followings = 0
        })
      // session.user.tag = data.username
      session.user.uid = token.sub
      return session
    },
  },
  secret: process.env.JWT_SECRET,
})
