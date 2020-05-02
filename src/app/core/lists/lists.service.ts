import { Injectable } from "@angular/core";
import { List, ListProduct, ListParticipant } from "../../shared/models/list.model";

import * as firebase from "firebase/app"

import {
  AngularFirestore
} from "@angular/fire/firestore";

import { BehaviorSubject, of, combineLatest } from "rxjs";
import { switchMap, filter } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: "root"
})
export class ListService {

  private _ownedLists$: BehaviorSubject<List[]> = new BehaviorSubject([])
  private _sharedLists$: BehaviorSubject<List[]> = new BehaviorSubject([])

  public user$: BehaviorSubject<ListParticipant> = new BehaviorSubject(null)
  public lists$: BehaviorSubject<List[]> = new BehaviorSubject([])

  constructor(
    private auth: AuthService,
    private afs:  AngularFirestore,
  ) {
    auth.user$.pipe(
      switchMap(user => {
        if (user === null) return null;

        const { uid, email, displayName, photoURL }: ListParticipant = user;

        return of({ uid, email, displayName, photoURL })
      })
    ).subscribe(this.user$)

    this.user$.pipe(filter(user => user !== null)).pipe(
      switchMap(user =>
        afs.collection<List>("lists", reference =>
          reference.where("owner", "==", user.uid)
        ).valueChanges()
      )
    ).subscribe(this._ownedLists$)

    this.user$.pipe(filter(user => user !== null)).pipe(
      switchMap(user =>
        afs.collection<List>("lists", reference =>
          reference.where("participants", "array-contains", user)
        ).valueChanges()
      )
    ).subscribe(this._sharedLists$)

    combineLatest(this._ownedLists$, this._sharedLists$).pipe(
      switchMap(([owned, shared]) =>
        of(owned.concat(shared))
      )
    ).subscribe(this.lists$)
  }

  async create(): Promise<string> {
    const uid = this.user$.getValue().uid
    const lid = this.afs.createId()
    const list: List = {
      lid: lid,
      name: 'Nueva Lista',
      owner: uid,
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

  getList(lid: string): BehaviorSubject<List> {
    const list: BehaviorSubject<List> = new BehaviorSubject(null)

    this.lists$.pipe(
      switchMap(lists => of(lists.find(list => list.lid === lid)))
    ).subscribe(list)

    return list
  }

  async emptyList(lid: string) {
    const list = this.lists$.getValue().find(list => list.lid === lid)

    list.products = []

    await this.update(lid, list)
  }

  async addProduct(lid: string, product: ListProduct) {
    await this.afs.collection<List>('lists').doc(lid).update({
      products: firebase.firestore.FieldValue.arrayUnion(product)
    })
  }

  async removeProduct(lid: string, product: ListProduct) {
    await this.afs.collection<List>('lists').doc(lid).update({
      products: firebase.firestore.FieldValue.arrayRemove(product)
    })
  }

  async addParticipant(lid: string, _email: string) {
    if (_email === this.user$.getValue().email) {
      throw new Error("No puedes invitarte a ti mismo 🥴")
    }

    const userCollection = await this.afs.collection<User>("users", reference =>
      reference.where("email", "==", _email)
    ).get().toPromise();

    const userDocs = userCollection.docs;

    if (userDocs.length < 1) {
      throw new Error("No existen usuarios con ese email");
    }

    const { uid, email, displayName, photoURL } = <User>userDocs[0].data();
    const participant = { uid, email, displayName, photoURL }

    await this.afs.collection<List>('lists').doc(lid).update({
      participants: firebase.firestore.FieldValue.arrayUnion(participant)
    })
  }

  async removeParticipant(lid: string, participant: ListParticipant) {
    await this.afs.collection<List>('lists').doc(lid).update({
      participants: firebase.firestore.FieldValue.arrayRemove(participant)
    })
  }

}
