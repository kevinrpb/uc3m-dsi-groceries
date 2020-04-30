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
