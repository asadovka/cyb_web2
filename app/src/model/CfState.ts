/**
 * Root of redux state object.
 */
import {DataState} from "./DataState";

export interface CfState {
  readonly form: CfStateForm;
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
