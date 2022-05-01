import { atom } from 'recoil'
export const userState = atom({
  key: 'userState',
  default: false,
})
export const userData = atom({
  key: 'userData',
  default: '',
})
