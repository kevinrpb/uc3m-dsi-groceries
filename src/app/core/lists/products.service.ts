import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, merge } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AuthService } from '../auth/auth.service';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  products$: Observable<Product[]>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.products$ = afs.collection<Product>('products').valueChanges();
  }

  getProducts(): Promise<Product[]> {
    return this.products$.toPromise()
  }
}
