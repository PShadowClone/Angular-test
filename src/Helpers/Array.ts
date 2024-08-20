if (!Array.prototype.findById) {
  /**
   * get element by id
   * @param id
   * @author Amr
   */
  Array.prototype.findById = function (id: number) {
    return this.find(item => item?.id == id);
  }
}
if (!Object.prototype.equals) {
  /**
   * check if the passed object equals the current one.
   *
   * @param object
   * @author Amr
   */
  Object.prototype.equals = function (object: Object) {
    return JSON.stringify(this) == JSON.stringify(object);
  }
}
if (!Array.prototype.search) {
  /**
   * search for the item according to the passed searched text
   * @param text
   * @author Amr
   */
  Array.prototype.search = function (text: string) {
    text = text.toLowerCase();
    return this.filter(item => JSON.stringify(Object.values(item)).toLowerCase().includes(text))
  }
}

