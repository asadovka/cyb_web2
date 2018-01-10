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


function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

let count = 0;
const subscribeTrades = (cb, pairs) => {
  // e.listen(data => {
  //   if (data.type === 'trades') {
  //     cb(data.value)
  //   }
  // });
  // // const msg = `{"subscribe":"trades","pairs":[${pairs}], "exchanges": ["HitBtc"] }`;
  // const msg = `{"subscribe":"trades","pairs":[${pairs}] }`;
  // console.log(msg)
  // socket.send(msg);

  setInterval(() => {
    if (count == 0) {
      let trades = [];

      const size = getRandomInRange(0, 20);

      for(let i =0; i < size; i++) {
        const baseAmount = getRandomInRange(0, 10);
        const type = getRandomInRange(0, 1) ? 'SELL': 'BUY';
        const spotPrice = type == 'SELL' ? getRandomInRange(12000, 13000): getRandomInRange(14000, 16000);

        trades.push({
          exchange: getRandomInRange(0, 1) ? 'HitBtc' : 'GDAX',
          type: type,
          tradeId: guid(),
          baseAmount: baseAmount,
          spotPrice: spotPrice,
          quoteAmount: baseAmount * spotPrice,
        })
      }

      cb(trades);
      count ++;
    } else {
      const baseAmount = getRandomInRange(0, 10);
      const type = getRandomInRange(0, 1) ? 'SELL': 'BUY';
      const spotPrice = type == 'SELL' ? getRandomInRange(12000, 13000): getRandomInRange(14000, 16000);
      cb({
          exchange: getRandomInRange(0, 1) ? 'HitBtc' : 'GDAX',
          type: type,
          tradeId: guid(),
          baseAmount: baseAmount,
          spotPrice: spotPrice,
          quoteAmount: baseAmount * spotPrice,
        });
    }
  }, 100);
}

const subscribeOrders = (cb, pairs) => {
  // e.listen(data => {
  //   if (data.type === 'orders') {
  //     cb(data.value)
  //   }
  // });
  // const msg = `{"subscribe":"orders","pairs":[${pairs}] }`;
  // console.log(msg)
  // socket.send(msg);

  setInterval(() => {
    if (count == 0) {
      let trades = [];

      for(let i =0; i < 1000; i++) {
        const type = getRandomInRange(0, 1) ? 'SELL': 'BUY';
        const baseAmount = getRandomInRange(0, 10);
        const spotPrice = type == 'SELL' ? getRandomInRange(12000, 13000): getRandomInRange(14000, 16000);
        trades.push({
          exchange: getRandomInRange(0, 1) ? 'HitBtc' : 'GDAX',
          type,
          tradeId: guid(),
          amount: baseAmount,
          spotPrice: spotPrice,
        })
      }

      cb(trades);
      count ++;
    } else {
      let trades = [];

      const size = getRandomInRange(0, 20);

      for(let i =0; i < size; i++) {
        const type = getRandomInRange(0, 1) ? 'SELL': 'BUY';
        const baseAmount = getRandomInRange(0, 10);
        const spotPrice = type == 'SELL' ? getRandomInRange(12000, 13000): getRandomInRange(14000, 16000);
        trades.push({
          exchange: getRandomInRange(0, 1) ? 'HitBtc' : 'GDAX',
          type: type,
          tradeId: guid(),
          amount: baseAmount,
          spotPrice: spotPrice,
        })
      }

      cb(trades);
    }
  }, 100);
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
