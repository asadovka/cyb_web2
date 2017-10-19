import {HttpService} from "../http/HttpService";
import {SearchResponse} from "../actions/CfActions";

export interface SearchApi {
  search(query: string, page: number): Promise<SearchResponse>;
}

export class DefaultSearchApi implements SearchApi {
  constructor(
    private readonly http: HttpService
  ) {
  }

  search(query: string, page: number = 0): Promise<SearchResponse> {
    return this.http.GET(
      `/api/search`,
      {
        params: {query, page}
      }
    );
  }
}
