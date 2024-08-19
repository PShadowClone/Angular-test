if (!Array.prototype.findById) {
  Array.prototype.findById = function (id: number) {
    return this.find(item => item?.id == id);
  }
}

