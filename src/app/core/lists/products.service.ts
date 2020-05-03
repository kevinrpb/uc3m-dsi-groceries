import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { compareTwoStrings } from "string-similarity";

import { BehaviorSubject, of, combineLatest } from "rxjs";
import { Product } from 'src/app/shared/models/product.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public filteredProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _filterSearch: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private afs: AngularFirestore,
  ) {
    afs.collection<Product>('products').valueChanges().subscribe(this.products$);

    combineLatest(this.products$, this._filterSearch).pipe(
      switchMap(([products, search]) => {
        if (search.length < 2) return of([]);

        let _products = products.filter(product => this.checkFilter(product, search));

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

  setFilter(filter: string) {
    this._filterSearch.next(filter);
  }

  checkFilter(product: Product, searchString: string): boolean {
    const { name, category, tags } = product;

    const searchWords = searchString.split(' ');

    const compareWords = [category, ...tags, ...name.split(' ')];
    const compareString = compareWords.join(' ');

    let score = compareTwoStrings(searchString, compareString) * 3;

    for (let word of searchWords) {
      if (compareWords.includes(word)) score += 0.2;
    }

    console.group(product.name);
    console.log(searchString);
    console.log(compareString);
    console.log(score);
    console.groupEnd();

    return score >= 0.2;
  }
}
