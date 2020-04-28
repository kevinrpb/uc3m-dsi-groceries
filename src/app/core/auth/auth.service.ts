import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User, UserHealthData } from "../../shared/models/user.model";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

    this.user$.subscribe((user: User) => {
      if (
        user !== null &&
        user.firstLoginCompleted === false
      ) {
        this.router.navigate(["/profile"])
      }
    });
  }

  getUser(): Promise<User> {
    return this.user$.toPromise()
  }

  getAFUser(): Promise<User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    return this.updateUserData(credential.user);
  }

  private updateUserData({
    uid,
    email,
    displayName,
    photoURL
  }) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async updateUserHealthData({ height, weight, gender }: UserHealthData) {
    const { uid, email } = await this.getAFUser();

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      healthData: { height, weight, gender }
    };

    await userRef.set(data, { merge: true });
  }

  async completeFirstLogin() {
    const { uid, email } = await this.getAFUser();

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      firstLoginCompleted: true
    };

    await userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();

    this.router.navigate(["/"]);
  }
}
