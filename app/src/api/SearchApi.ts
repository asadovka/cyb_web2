import {HttpService} from "../http/HttpService";
import {SearchResponse} from "../actions/CfActions";

export interface SearchApi {
  search(query: string): Promise<SearchResponse>;
}

export class DefaultSearchApi implements SearchApi {
  constructor(
    private http: HttpService
  ) {
  }

  search(query: string): Promise<SearchResponse> {
    return this.http.GET(
      `/api/search`,
      {
        params: {query}
      }
    );
  }
}
