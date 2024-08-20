interface Array<T> {
  findById(id: number): T | undefined;
  search(text : string) : Array<T>
}

interface Object {
  equals(arg: object): boolean
}
