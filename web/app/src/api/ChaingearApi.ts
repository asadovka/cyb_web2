var config = require('./config.js')

export class DefaulChaingearApi  {
  constructor(
    http
  ) {
    this.http = http;
  }


  test() {
    return this.http.GET(
      `${config.CYBER_CHAINGEAR_API}/api/tokens`
    );
  }

  getAllTokens() {
    return this.http.GET(`${config.CYBER_CHAINGEAR_API}/api/tokens`)
  }

  getAllCrowdsales() {
    return this.http.GET(`${config.CYBER_CHAINGEAR_API}/api/crowdsales`)
  }

  imageUrl() {
    return `${config.CYBER_CHAINGEAR_API}/logos/`;
  }

  crowdsalesDetails(system) {
    return this.http.GET(`${config.CYBER_CHAINGEAR_API}/api/crowdsales/${system}`)
  }

  tokensDetails(symbol) {
   return this.http.GET(`${config.CYBER_CHAINGEAR_API}/api/tokens/${symbol}`)
  }
}
