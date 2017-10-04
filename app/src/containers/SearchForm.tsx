import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";
import {SearchFormComponent} from "../components/SearchFormComponent";
import {CfState} from "../model/CfState";
import {CfActions} from "../actions/CfActions";

const SearchFormReduxForm = reduxForm({
  form: "search"
})(SearchFormComponent);

export const SearchForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchFormReduxForm));

function mapStateToProps(state: CfState, ownProps) {
  return {
    initialValues: {
      query: ownProps.location.query.q
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search: (query: string) => {
      dispatch({
        type: CfActions.SEARCH,
        payload: {query}
      });
    }
  };
}
