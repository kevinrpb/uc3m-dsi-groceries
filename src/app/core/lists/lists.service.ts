import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { List } from "../../shared/models/list.model";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, merge } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: "root"
})
export class ListService {
  private _ownedLists$: Observable<List[]>;
  private _sharedLists$: Observable<List[]>;

  uid$: Observable<string>;
  lists$: Observable<List[]>;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
  ) {
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

    this.lists$ = merge(this._ownedLists$, this._sharedLists$);
  }
}
