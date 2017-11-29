import {HttpService} from "../http/HttpService";
import {SearchResponse} from "../actions/CfActions";

var config = require('./config.js')

export interface SearchApi {
  search(query: string, page: number, coins: string, type: string): Promise<SearchResponse>;
  test(): Promise<any>;
}

export class DefaultSearchApi implements SearchApi {
  constructor(
    private readonly http: HttpService
  ) {
  }

  search(query: string, page: number = 0, coins: string, type: string): Promise<SearchResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/api/search`,
      {
        params: {query, page, coins, type}
      }
    );
  }

  test() {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/api/search`,
      {
        params: {query: 'test' }
      }
    );
  }
}
