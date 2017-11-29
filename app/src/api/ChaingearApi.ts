import {HttpService} from "../http/HttpService";
import {SearchResponse} from "../actions/CfActions";

var config = require('./config.js')

export interface ChaingearApi {
  test(): Promise<any>;
}

export class DefaulChaingearApi implements ChaingearApi {
  constructor(
    private readonly http: HttpService
  ) {
  }


  test() {
    return this.http.GET(
      `${config.CYBER_CHAINGEAR_API}/api/tokens`
    );
  }
}
