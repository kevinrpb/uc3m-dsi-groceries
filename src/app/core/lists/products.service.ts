import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { BehaviorSubject, of, merge, combineLatest } from "rxjs";
import { Product } from 'src/app/shared/models/product.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public filteredProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _filterKeywords: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private afs: AngularFirestore,
  ) {
    afs.collection<Product>('products').valueChanges().subscribe(this.products$);

    combineLatest(this.products$, this._filterKeywords).pipe(
      switchMap(([products, keywords]) => {
        if (keywords.length < 1) return of([]);

        let _products = products.filter(product => this.checkFilter(product, keywords));

        if (_products.length > 15) _products = _products.slice(0, 14);

        return of(_products);
      })
    ).subscribe(this.filteredProducts$);
  }

  getProducts(): Product[] {
    return this.products$.getValue()
  }

  getProduct(pid: string): Product {
    return this.getProducts().find(p => p.pid === pid)
  }

  setFilter(keywords: string[]) {
    this._filterKeywords.next(keywords);
  }

  checkFilter(product: Product, keywords: string[]): boolean {
    const { name, category, tags } = product;
    const nameWords = name.split(' ');

    for (let keyword of keywords) {
      if (
        nameWords.includes(keyword) ||
        category === keyword ||
        tags.includes(keyword)
      ) return true;
    }

    return false;
  }
}
