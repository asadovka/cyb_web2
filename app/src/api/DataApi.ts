import {HttpService} from "../http/HttpService";
import {
  BitcoinBlockResponse,
  BitcoinTxResponse,
  EthereumBlockResponse,
  EthereumTxResponse
} from "../actions/CfActions";

var config = require('./config.js')

export interface DataApi {
  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse>;

  getBitcoinTx(txId: string): Promise<BitcoinTxResponse>;

  getEthereumBlock(blockNumber: string): Promise<EthereumBlockResponse>;

  getEthereumTx(txHash: string): Promise<EthereumTxResponse>;
}

export class DefaultDataApi implements DataApi {
  constructor(
    private readonly http: HttpService
  ) {
  }

  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/api/bitcoin/block/${blockNumber}`
    );
  }

  getBitcoinTx(txId: string): Promise<BitcoinTxResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/api/bitcoin/tx/${txId}`
    );
  }

  getEthereumBlock(blockNumber: string): Promise<EthereumBlockResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/api/ethereum/block/${blockNumber}`
    );
  }

  getEthereumTx(txHash: string): Promise<EthereumTxResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/api/ethereum/tx/${txHash}`
    );
  }
}
