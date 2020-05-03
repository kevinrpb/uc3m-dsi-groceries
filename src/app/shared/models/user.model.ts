export enum UserGender {
  male,
  female,
  nonBinary
}

export interface UserHealthData {
  height?: number
  weight?: number
  gender?: UserGender
  birthdate?: Date
}

export interface User {
  uid: string
  email: string
  photoURL?: string
  displayName?: string
  healthData?: UserHealthData
}

export function age(birthdate: any): number {
  const today = new Date()
  const date = new Date(birthdate.seconds * 1000)
  let age = today.getFullYear() - date.getFullYear()
  const m = today.getMonth() - date.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age -= 1
  }
  return age
}
