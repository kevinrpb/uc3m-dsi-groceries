import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { List } from "../../shared/models/list.model";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, first, filter } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: "root"
})
export class ListService {
  uid$: Observable<string>;

  _ownedLists$: Observable<List[]>;
  _sharedLists$: Observable<List[]>;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
  ) {
    // Get the user id on
    auth.user$.pipe(switchMap(user => user ? user.uid : null));

    this._ownedLists$ = this.uid$.pipe(
      switchMap(uid =>
        afs.collection<List>("lists", reference =>
          reference.where("owner", "==", uid)
        ).valueChanges()
      )
    );

    this._sharedLists$ = this.uid$.pipe(
      switchMap(uid =>
        afs.collection<List>("lists", reference =>
          reference.where("owner", "==", uid)
        ).valueChanges()
      )
    );
  }
}
