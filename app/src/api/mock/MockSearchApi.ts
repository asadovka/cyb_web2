import {HttpService} from "../../http/HttpService";
import {SearchResponse} from "../../actions/CfActions";
import {SearchApi} from "../SearchApi";

export class MockSearchApi implements SearchApi {
  constructor(
    private http: HttpService
  ) {
  }

  search(query: string): Promise<SearchResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(`{"query":"1857b83776aea3ef26f00ed19a50c083b1d369be01b805d50255bef34814928f","page":0,"pageSize":10,"totalHits":1,"searchTime":16,"items":[{"type":"bitcoin_tx","data":{"block_time":"2009-02-28T14:48:40.000Z","total_output":"0","fee":"0","block_hash":"0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049","block_number":5885,"txid":"1857b83776aea3ef26f00ed19a50c083b1d369be01b805d50255bef34814928f"}}]}`));
      }, 1000);
    });
  }
}
