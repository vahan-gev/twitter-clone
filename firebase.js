import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDfaT6A1Shs_7GN-oN_8HjafzG554_5NBs',
  authDomain: 'twitter-clone-d874c.firebaseapp.com',
  projectId: 'twitter-clone-d874c',
  storageBucket: 'twitter-clone-d874c.appspot.com',
  messagingSenderId: '29812425762',
  appId: '1:29812425762:web:b7ea2f8320ce24f172767b',
}
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()
export default app
export { db, storage, auth }
