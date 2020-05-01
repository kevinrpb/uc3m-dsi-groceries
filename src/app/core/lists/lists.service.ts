import { Injectable } from "@angular/core";
import { List, ListProduct } from "../../shared/models/list.model";

import * as firebase from "firebase/app"

import {
  AngularFirestore
} from "@angular/fire/firestore";

import { BehaviorSubject, of, combineLatest } from "rxjs";
import { switchMap, filter } from "rxjs/operators";
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
    private afs:  AngularFirestore,
  ) {
    auth.user$.pipe(switchMap(user => user ? of(user.uid) : null)).subscribe(this.uid$)

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
      switchMap(([owned, shared]) =>
        of(owned.concat(shared))
      )
    ).subscribe(this.lists$)
  }

  async create(): Promise<string> {
    const uid = this.uid$.getValue()
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

  // TODO: Debe recibir un email y encontrar el ucid asociado
  async addParticipant(lid: string, newUser: string) {
    await this.afs.collection<List>('lists').doc(lid).update({
      participants: firebase.firestore.FieldValue.arrayUnion(newUser)
    })
  }

}
