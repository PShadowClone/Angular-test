export class Stack<T> {

  items: Array<T> = new Array<T>();

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peak(): T | undefined {
    try {
      return this.items[this.items.length - 1]
    } catch (e) {
      return undefined;
    }
  }

  isEmpty(): boolean {
    return this.items.length == 0
  }

  size(): number {
    return this.items.length
  }
}
