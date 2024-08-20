export class Stack<T> {

  /**
   * Core item of the stack data structure
   * @author Amr
   */
  items: Array<T> = []

  /**
   * push a new item to the list
   * @param item
   * @author Amr
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * return the last item, then remove it from the array
   * @author Amr
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * let check the last element
   * @author Amr
   */
  peak(): T | undefined {
    try {
      return this.items[this.items.length - 1]
    } catch (e) {
      return undefined;
    }
  }

  /**
   * check if the items list is empty according to the length of list
   * @author Amr
   */
  isEmpty(): boolean {
    return this.items.length == 0
  }

  /**
   * items list length
   * @author Amr
   */
  size(): number {
    return this.items.length
  }
}
