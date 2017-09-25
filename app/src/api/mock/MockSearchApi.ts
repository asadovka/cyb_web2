import {HttpService} from "../../http/HttpService";
import {SearchResponse} from "../../actions/CfActions";
import {SearchApi} from "../SearchApi";

export class MockSearchApi implements SearchApi {
  constructor(
    private http: HttpService
  ) {
  }

  search(query: string): Promise<SearchResponse> {
    return Promise.resolve({
      query,
      page: 1,
      pageSize: 10,
      totalHits: 0,
      searchTime: 0,
      items: []
    });
  }
}
