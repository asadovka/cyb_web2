import {HttpService} from "../http/HttpService";
import {SearchResponse, SearchResponseItem, BitcoinBlockResponse} from "../actions/CfActions";

var config = require('./config.js')

export interface SearchApi {
  search(query: string, page: number, coins: string, type: string): Promise<SearchResponse>;
  test(): Promise<any>;
  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse>;
  getBitcoinTx(txId: string): Promise<any>;

  getEthereumBlock(blockNumber: string): Promise<any>;
  getEthereumTx(txHash: string): Promise<any>;
}

export class DefaultSearchApi implements SearchApi {
  constructor(
    private readonly http: HttpService
  ) {
  }

  search(query: string, page: number = 0, coins: string, type: string): Promise<SearchResponse> {
    return this.http.GET(
      `${config.CYBER_SEARCH_API}/search`,
      {
        params: {query, page, coins, type}
      }
    );

    // const items:SearchResponseItem[] = [
    //     {
    //       "type":"bitcoin_tx",
    //       "data":{
    //         "block_time":"2009-02-28T14:48:40.000Z",
    //         "total_output":"0",
    //         "fee":"0",
    //         "block_hash":"0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
    //         "block_number":5885,
    //         "txid":"1857b83776aea3ef26f00ed19a50c083b1d369be01b805d50255bef34814928f"
    //       }
    //      },
    //      {
    //        type: "bitcoin_block",
    //        data: {
    //          "hash" : "0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
    //           "height" : 0,
    //           "time" : "2015-07-20T15:49:04-07:00",
    //           "nonce" : 0,
    //           "merkleroot" : "string",
    //           "size" : 0,
    //           "version" : 0,
    //           "weight" : 0,
    //           "bits" : "string",
    //           "difficulty" : 1.5,
    //           "tx_number" : 0,
    //           "total_outputs_value" : "string", 
    //        }
    //       },
    //       {
    //       "type":"ethereum_tx",
    //       "data":{
    //         "block_time":"2009-02-28T14:48:40.000Z",
    //         "total_output":"0",
    //         "fee":"0",
    //         "hash":"0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
    //         "block_number":5885,
    //         "txid":"1857b83776aea3ef26f00ed19a50c083b1d369be01b805d50255bef34814928f"
    //       }
    //      },
    //      {
    //        type: "ethereum_block",
    //        data: {
    //          "hash" : "0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
    //           "height" : 0,
    //           "time" : "2015-07-20T15:49:04-07:00",
    //           "nonce" : 0,
    //           "merkleroot" : "string",
    //           "size" : 0,
    //           "version" : 0,
    //           "weight" : 0,
    //           "bits" : "string",
    //           "difficulty" : 1.5,
    //           "number" : 4,
    //           "total_outputs_value" : "string", 
    //        }
    //      }
    //   ]

    // const data:SearchResponse = {
    //   query: '42',
    //   page: 1,
    //   pageSize: 10,
    //   totalHits: 100,
    //   searchTime: 1,
    //   items: items
    // };

    // return Promise.resolve(data);
  }

  getBitcoinBlock(blockNumber: string): Promise<BitcoinBlockResponse> {
    const data:BitcoinBlockResponse = {
      "hash" : "string",
      "height" : 0,
      "time" : "2015-07-20T15:49:04-07:00",
      "nonce" : 0,
      "merkleroot" : "string",
      "size" : 0,
      "version" : 0,
      "weight" : 0,
      "bits" : "string",
      "difficulty" : 1.5,
      "tx_number" : 0,
      "total_outputs_value" : "string",      
    }

    return Promise.resolve(data);
  }

  getBitcoinTx(txId: string): Promise<any> {
    const data = {
      "block_time":"2009-02-28T14:48:40.000Z",
      "total_output":"0",
      "fee":"0",
      "block_hash":"0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
      "block_number":5885,
      "txid":"1857b83776aea3ef26f00ed19a50c083b1d369be01b805d50255bef34814928f"
    };
    return Promise.resolve(data);
  }

  getEthereumBlock(blockNumber: string): Promise<any> {
    // return this.http.GET(
    //   `${config.CYBER_SEARCH_API}/api/ethereum/block/${blockNumber}`
    // );

    return Promise.resolve({ 
       "hash" : "0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
        "height" : 0,
        "time" : "2015-07-20T15:49:04-07:00",
        "nonce" : 0,
        "merkleroot" : "string",
        "size" : 0,
        "version" : 0,
        "weight" : 0,
        "bits" : "string",
        "difficulty" : 1.5,
        "number" : 4,
        "total_outputs_value" : "string"
    })
  }

  getEthereumTx(txHash: string): Promise<any> {
    // return this.http.GET(
    //   `${config.CYBER_SEARCH_API}/api/ethereum/tx/${txHash}`
    // );
    return Promise.resolve({ 
      "block_time":"2009-02-28T14:48:40.000Z",
      "total_output":"0",
      "fee":"0",
      "hash":"0000000018920212d4d4dcddb6e24f37d23b35a0078d270227c83051bb350049",
      "block_number":5885,
      "txid":"1857b83776aea3ef26f00ed19a50c083b1d369be01b805d50255bef34814928f"
     })    
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
