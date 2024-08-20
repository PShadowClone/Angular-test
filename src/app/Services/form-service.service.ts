import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormService<T extends {id? : number}> {

  private items: Array<T> = [];
  private observer: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor() {
  }

  add(item: T) {
    this.items.push(item);
    this.observer.next(this.items);
  }
  update(item:T , id:number){
    const index = this.items.findIndex(_item => _item.hasOwnProperty('id') &&  _item?.id == id)
    if(index != -1)
      this.items[index] = {...item};
    this.observer.next(this.items)
  }

  observe() {
    return this.observer.asObservable();
  }
}
