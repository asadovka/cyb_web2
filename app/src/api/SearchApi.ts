import {HttpService} from "../http/HttpService";
import {SearchResponse, SearchResponseItem, BitcoinBlockResponse} from "../actions/CfActions";

var config = require('./config.js')

export interface SearchApi {
  search(query: string, page: number, chains: string, entities: string, pageSize: number): Promise<SearchResponse>;
  test(): Promise<any>;

  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse>;
  getBitcoinTx(txId: string): Promise<any>;


  getBitcoinCashBlock(blockNumber: string): Promise<BitcoinBlockResponse>;
  getBitcoinCashTx(txId: string): Promise<any>;

  getEthereumBlock(blockNumber: string): Promise<any>;
  getEthereumTx(txHash: string): Promise<any>;

  getEthereumClassicTx(txHash: string): Promise<any>;
  getEthereumClassicBlock(blockNumber: string): Promise<any>;
}

export class DefaultSearchApi implements SearchApi {
  constructor(
    private readonly http: HttpService
  ) {
  }

  search(query: string, page: number = 0, chains: string, entities: string, pageSize: number = 10): Promise<SearchResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/search`,
      {
        params: {query, page, chains, entities, pageSize}
      }
    );
  }

  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse> {
    return this.http.GET(`${config.CYBER_SEARCH_API}/bitcoin/block/${blockNumber}`)
  }

  getBitcoinTx(txId: string): Promise<any> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/bitcoin/tx/${txId}`
    );
  }


  getBitcoinCashBlock(blockNumber: string): Promise<BitcoinBlockResponse> {
    return this.http.GET(`${config.CYBER_SEARCH_API}/bitcoin_cash/block/${blockNumber}`)
  }

  getBitcoinCashTx(txId: string): Promise<any> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/bitcoin_cash/tx/${txId}`
    );
  }


  getEthereumBlock(blockNumber: string): Promise<any> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/ethereum/block/${blockNumber}`
    );
  }


  getEthereumTx(txHash: string): Promise<any> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/ethereum/tx/${txHash}`
    );
  }

  getEthereumClassicBlock(blockNumber: string): Promise<any> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/ethereum_classic/block/${blockNumber}`
    );
  }

  getEthereumClassicTx(txHash: string): Promise<any> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/ethereum_classic/tx/${txHash}`
    )
  }

  test() {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/search`,
      {
        params: {query: 'test' }
      }
    );
  }
}
