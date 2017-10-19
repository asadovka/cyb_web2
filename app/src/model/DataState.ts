import {
  BitcoinBlockResponse,
  BitcoinTxResponse,
  EthereumBlockResponse,
  EthereumTxResponse
} from "../actions/CfActions";

export interface DataState {
  readonly bitcoinBlock: BlockchainState<BitcoinBlockResponse>;
  readonly bitcoinTx: BlockchainState<BitcoinTxResponse>;
  readonly ethereumBlock: BlockchainState<EthereumBlockResponse>;
  readonly ethereumTx: BlockchainState<EthereumTxResponse>;
}

interface BlockchainState<T> {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  data?: T;
}
