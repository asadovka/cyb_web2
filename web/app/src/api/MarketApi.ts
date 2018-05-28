
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
  getHistoMinute(fsym, tsym, toTs=1, e=null){ 
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/histominute?fsym=${fsym}&tsym=${tsym}&toTs=${toTs}${e ? '&e=' + e : ''}`
    );
  }
  getHistoHour(fsym, tsym, toTs=1, e=null){ 
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/histohour?fsym=${fsym}&tsym=${tsym}&toTs=${toTs}${e ? '&e=' + e : ''}`
    );
  }

  getHistoDay(fsym, tsym, toTs=1, e=null){ 
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/histoday?fsym=${fsym}&tsym=${tsym}&toTs=${toTs}${e ? '&e=' + e : ''}`
    );
  }

  tokenDetails(fsym) {
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/tokendetails?fsym=${fsym}`
    );
  }

  pricemultifull(fsyms, tsyms) {
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`
    );    
  }

  getTokens(pairs) {
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/tokens?fsyms=${pairs}`
    );
  }

  getPriceOnDate(fsym, tsyms, ts) {
    return this.http.GEt(
      `${config.CYBER_MARKETS_API}/pricehistorical?fsym=${fsym}&tsyms=${tsyms}&ts=${ts}`
    );
  }

}
