let socket;

import { emitter } from '../utils/emitter';


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

const subscribeTickers = (cb, pairs, window_durations = 60 * 1000) => {
  e.listen(data => {
    if (data.type === 'tickers') {
      cb(data.value)
    }
  });
  const msg = `{"subscribe":"tickers","pairs":[${pairs}], "exchanges": ["ALL"], "window_durations": ["${window_durations}"] }`;

  socket.send(msg);
}

const subscribeTrades = (cb, pairs, window_durations = 60 * 1000) => {
  e.listen(data => {
    if (data.type === 'trades') {
      cb(data.value)
    }
  });
  const msg = `{"subscribe":"trades","pairs":[${pairs}], "window_durations": ["${window_durations}"] }`;

  socket.send(msg);
}

const subscribeOrders = (cb, pairs) => {
  e.listen(data => {
    if (data.type === 'orders') {
      cb(data.value)
    }
  });
  const msg = `{"subscribe":"orders","pairs":[${pairs}], "exchanges": "HitBtc" }`;
  socket.send(msg);
}

const test = (url) => {
  return new Promise(resolve => {
    open(url, () => {
      getPairs(pairs => {
        close();
        resolve();
      })
    })  
  })
  
}

export default {
  open,
  close,
  getPairs,
  subscribeTickers,
  subscribeTrades,
  subscribeOrders,
  test
}
