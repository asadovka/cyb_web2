import {SearchResponse} from "../actions/CfActions";

export interface SearchState {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  data?: SearchResponse;
}


