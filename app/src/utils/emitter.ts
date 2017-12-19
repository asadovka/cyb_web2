
/* tslint:disable */
class Listener {

  constructor(fn, ctx) {
    this.fn = fn
    this.ctx = ctx
  }
}

class Emitter {
  listeners: any;

  listen(fn, ctx) {
    this.listeners.push(new Listener(fn, ctx))
  }
  unlisten(fn, ctx) {
    for (var i = 0; i < this.listeners.length; i++) {
      var listener = this.listeners[i]
      if (listener.fn === fn && listener.ctx === ctx) {
        this.listeners.splice(i, 1)
        return
      }
    }
  }
  emit() {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].fn.apply(this.listeners[i].ctx, arguments)
    }
  }
}

export function emitter() {
  function action() {
    action.emit.apply(action, arguments)
  }
  action.listeners = [];
  action.__proto__ = Emitter.prototype

  return action
}

/* tslint:enable */
