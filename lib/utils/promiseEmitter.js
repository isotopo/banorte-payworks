module.exports = class extends EventEmitter {
  constructor(cb) {
    super()
    this.promise = new Promise(cb);
  }
  then(cb) {
    this.promise = this.promise.then(cb)
    return this
  }
  catch (cb) {
    this.promise = this.promise.catch(cb)
    return this
  }
}