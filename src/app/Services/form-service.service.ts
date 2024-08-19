import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormService<T> {

  private items: Array<T> = [];
  private observer: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() {
  }

  add(item: T) {
    this.items.push(item);
    this.observer.next(this.items);
  }

  observe() {
    return this.observer.asObservable();
  }
}
