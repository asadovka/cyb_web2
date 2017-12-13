let socket;


/* tslint:disable */
class Listener {
  fn: any;
  ctx: any;

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

function emitter() {
  function action() {
    (action as any).emit.apply(action, arguments)
  }
  (action as any).listeners = [];
  (action as any).__proto__ = Emitter.prototype

  return action
}

/* tslint:enable */

let e;
const open = (url, cb) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
     e = emitter();
     cb();


     socket.onmessage = (event) => {
      //console.log(' event > ', event);

      const data = JSON.parse(event.data);

      e(data);
    };
  };
}


const close = () => {
  e = null;
  socket.close();
}


const getPairs = (cb) => {
  e.listen(data => {
    if (data.type === 'pairs') {
      cb(data.value)
    }
  });
  socket.send('{"get":"pairs"}');
}

const subscribeTickers = (cb, pairs) => {
  e.listen(data => {
    if (data.type === 'tickers') {
      cb(data.value)
    }
  });
  const msg = `{"subscribe":"tickers","pairs":[${pairs}], "exchanges": ["ALL"], "window_durations": ["${60 * 1000}"] }`;

  socket.send(msg);
}

const subscribeTrades = (cb, pairs) => {
  e.listen(data => {
    if (data.type === 'trades') {
      cb(data.value)
    }
  });
  const msg = `{"subscribe":"trades","pairs":[${pairs}], "window_durations": ["${60 * 1000}"] }`;

  socket.send(msg);
}


export default {
  open,
  close,
  getPairs,
  subscribeTickers,
  subscribeTrades
}
