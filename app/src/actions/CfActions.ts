export const CfActions = {
  SEARCH: "SEARCH",
  GET_BITCOIN_BLOCK: "GET_BITCOIN_BLOCK",
  GET_BITCOIN_TX: "GET_BITCOIN_TX",
  GET_ETHEREUM_BLOCK: "GET_ETHEREUM_BLOCK",
  GET_ETHEREUM_TX: "GET_ETHEREUM_TX",
  GET_STATISTICS: "GET_STATISTICS"
};

// // --- Models --- //
// export interface SearchPayload {
//   readonly query: string;
//   readonly page: number;
// }

// export interface SearchResponse {
//   readonly query?: string,
//   readonly page?: number,
//   readonly pageSize?: number,

//   readonly totalHits?: number,
//   readonly searchTime?: number, // ms
//   readonly items?: SearchResponseItem[]
// }

// export interface SearchResponseItem {
//   type: string;
//   data: any;
// }

// export interface BitcoinBlockResponse {
//   readonly hash: string;
//   readonly height: number; // long
//   readonly time: string;
//   readonly nonce: number; // long
//   readonly merkleroot: string;
//   readonly size: number;
//   readonly version: number;
//   readonly weight: number;
//   readonly bits: string;
//   readonly difficulty: number; // big decimal
//   readonly tx_number: number;
//   readonly total_outputs_value: string;
// }

// interface BitcoinBlockTransaction {
//   readonly fee: string;
//   readonly lock_time: string; // long
//   readonly hash: string;
//   readonly ins: BitcoinBlockTransactionIO[];
//   readonly outs: BitcoinBlockTransactionIO[];
// }

// interface BitcoinBlockTransactionIO {
//   readonly address: string;
//   readonly amount: string;
// }

// export interface BitcoinTxResponse {

// }

// export interface EthereumBlockResponse {

// }

// export interface EthereumTxResponse {

// }

