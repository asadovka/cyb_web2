import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";
import {SearchFormComponent} from "../components/SearchFormComponent";
import {CfState} from "../model/CfState";
import {CfActions} from "../actions/CfActions";

const SearchFormReduxForm = reduxForm({
  form: "search"
})(SearchFormComponent);

import { search } from '../modules/search';

export const SearchForm = withRouter(connect((state, ownProps) => ({
    page: ownProps.location.query.page,
    initialValues: {
      query: ownProps.location.query.q,
    }  
}), { search })(SearchFormReduxForm));


