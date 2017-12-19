
var config = require('./config.js')

export class DefaultMarketApi {
  constructor(
    http
  ) {
    this.http = http;
  }

  test() {
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/ping`
    );
  }
  getHistoMinute(fsym, tsym){ 
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/histominute?fsym=${fsym}&tsym=${tsym}&toTs=1`
    );
  }
  getHistoHour(fsym, tsym){ 
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/histohour?fsym=${fsym}&tsym=${tsym}&toTs=1`
    );
  }
  getTokensStatistics() {
    // return this.http.GET(
    //   `${config.CYBER_MARKETS_API}/tokenstats`
    // );
    const data = [
        {
          system: 'Agoras',
          price_usd: 12,
          price_bit: 34,
          price_history: [1,2,3, 4,5, 6, 7],
          percent: 2
        },
        {
          system: 'Agrello',
          price_usd: 12,
          price_bit: 34,
          price_history: [25,23,34, 42,53, 6, 7],
          percent: -5,
        },
        {
          system: 'Aidos Kuneen',
          price_usd: 12,
          price_bit: 34,
          price_history: [1,2,33, 4,53, 36, 7],
          percent: 2
        }
      ];

    return Promise.resolve(data);
  }
}
