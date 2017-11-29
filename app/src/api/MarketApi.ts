import {HttpService} from "../http/HttpService";
import {SearchResponse} from "../actions/CfActions";

var config = require('./config.js')

export interface MarketApi {
  test(): Promise<any>;
  getTokensStatistics(): Promise<any>;
}

export class DefaultMarketApi implements MarketApi {
  constructor(
    private readonly http: HttpService
  ) {
  }


  test() {
    return this.http.GET(
      `${config.CYBER_MARKETS_API}/`
    );
  }

  getTokensStatistics() {
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
