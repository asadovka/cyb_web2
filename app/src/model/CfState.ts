/**
 * Root of redux state object.
 */
import {SearchState} from "./SearchState";
import {DataState} from "./DataState";

export interface CfState {
  readonly form: CfStateForm;
  readonly search: SearchState;
  readonly data: DataState;
}

export interface CfStateForm {
  readonly search: CfStateFormSearch;
}

interface ReduxForm {
  readonly fields: {[key: string]: string|number}
}


export interface CfStateFormSearch extends ReduxForm {
}
