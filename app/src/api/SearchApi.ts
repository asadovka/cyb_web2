import {HttpService, DefaultHttpService } from "../http/HttpService";
import {SearchResponse, SearchResponseItem, BitcoinBlockResponse} from "../actions/CfActions";


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
  root: string;
  http: HttpService;
  constructor(
    root: string
  ) {
    this.root = root;
    this.http = new DefaultHttpService();
  }

  search(query: string, page: number = 0, chains: string, entities: string, pageSize: number = 10): Promise<SearchResponse> {
    return this.http.GET(
      `${this.root}/search`,
      {
        params: {query, page, chains, entities, pageSize}
      }
    );
  }

  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse> {
    return this.http.GET(`${this.root}/bitcoin/block/${blockNumber}`)
  }

  getBitcoinTx(txId: string): Promise<any> {
    return this.http.GET(
      `${this.root}/bitcoin/tx/${txId}`
    );
  }


  getBitcoinCashBlock(blockNumber: string): Promise<BitcoinBlockResponse> {
    return this.http.GET(`${this.root}/bitcoin_cash/block/${blockNumber}`)
  }

  getBitcoinCashTx(txId: string): Promise<any> {
    return this.http.GET(
      `${this.root}/bitcoin_cash/tx/${txId}`
    );
  }


  getEthereumBlock(blockNumber: string): Promise<any> {
    return this.http.GET(
      `${this.root}/ethereum/block/${blockNumber}`
    );
  }


  getEthereumTx(txHash: string): Promise<any> {
    return this.http.GET(
      `${this.root}/ethereum/tx/${txHash}`
    );
  }

  getEthereumClassicBlock(blockNumber: string): Promise<any> {
    return this.http.GET(
      `${this.root}/ethereum_classic/block/${blockNumber}`
    );
  }

  getEthereumClassicTx(txHash: string): Promise<any> {
    return this.http.GET(
      `${this.root}/ethereum_classic/tx/${txHash}`
    )
  }

  test() {
    return this.http.GET(
      `${this.root}/ping`
    );
  }
}
