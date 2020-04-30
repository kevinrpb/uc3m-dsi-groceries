import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { List } from "../../shared/models/list.model";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, merge, BehaviorSubject, of, combineLatest } from "rxjs";
import { switchMap, filter, mergeMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: "root"
})
export class ListService {

  private _ownedLists$: BehaviorSubject<List[]> = new BehaviorSubject([])
  private _sharedLists$: BehaviorSubject<List[]> = new BehaviorSubject([])

  public uid$: BehaviorSubject<string> = new BehaviorSubject(null)
  public lists$: BehaviorSubject<List[]> = new BehaviorSubject([])

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
  ) {
    auth.user$.pipe(switchMap(user => user ? of(user.uid) : of(null))).subscribe(this.uid$)

    this.uid$.pipe(filter(uid => uid !== null)).pipe(
      switchMap(uid =>
        afs.collection<List>("lists", reference =>
          reference.where("owner", "==", uid)
        ).valueChanges()
      )
    ).subscribe(this._ownedLists$)

    this.uid$.pipe(filter(uid => uid !== null)).pipe(
      switchMap(uid => 
        afs.collection<List>("lists", reference =>
          reference.where("participants", "array-contains", uid)
        ).valueChanges()
      )
    ).subscribe(this._sharedLists$)

    combineLatest(this._ownedLists$, this._sharedLists$).pipe(
      switchMap(([owned, shared]) => of(owned.concat(shared)))
    ).subscribe(this.lists$)
  }

  async create(): Promise<string> {
    const uid = this.uid$.getValue()
    const lid = this.afs.createId()
    const list: List = {
      lid: lid,
      name: 'Nueva Lista',
      owner: uid,
      shared: false,
      participants: [],
      products: []
    }

    await this.afs.collection<List>("lists").doc(lid).set(list)

    return lid;
  }

  async update(lid: string, newList: List) {
    await this.afs.collection<List>('lists').doc(lid).set(newList)
  }

  async delete(lid: string) {
    await this.afs.collection<List>('lists').doc(lid).delete()
  }

}
