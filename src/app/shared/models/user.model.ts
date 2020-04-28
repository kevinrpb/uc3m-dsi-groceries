export enum UserGender {
  male,
  female,
  nonBinary
}

export interface UserHealthData {
  height?: number;
  weight?: number;
  gender?: UserGender
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  firstLoginCompleted?: boolean;
  healthData?: UserHealthData;
}
