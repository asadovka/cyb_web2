export const CfActions = {
  SEARCH: "SEARCH"
};

// --- Models --- //
export interface SearchPayload {
  readonly query: string;
}

export interface SearchResponse {
  readonly query: string,
  readonly page: number,
  readonly pageSize: number,

  readonly totalHits: number,
  readonly searchTime: number, // ms
  readonly items: SearchResponseItem[]
}

export interface SearchResponseItem {
  type: string;
}
