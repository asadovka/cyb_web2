import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import * as React from "react";
import {Field} from "redux-form";
var ReactGA = require("react-ga");

export function SearchFormComponent(props) {
  const {handleSubmit, submitting, dirty, router, search, location} = props;
  const submit = values => {
    const {query} = values;

    router.push({
      pathname: "/search",
      query: {
        q: query,
        page: 0
      }
    });

    if (location.pathname === "/search") {
      search(query);
    };

    ReactGA.event({
      category: 'Search',
      action: 'Query',
    });
  }

  return (
    <form className="container" onSubmit={handleSubmit(submit)}>
      <div className="field has-addons has-addons-centered">
        <div className="control" style={{width:800}}>
          <Field
            name="query"
            className="input is-medium"
            component="input"
            type="text"
            placeholder="Multi-Blockchain explorer for Bitcoin & Ethereum"
          />
        </div>
        <div className="control">
          <button disabled={submitting} className="button is-info is-medium">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

const SearchFormReduxForm = reduxForm({
  form: "search"
})(SearchFormComponent);

import { search } from '../../modules/search';


export default withRouter(connect((state, ownProps) => ({
    page: ownProps.location.query.page,
    initialValues: {
      query: ownProps.location.query.q,
    }  
}), { search })(SearchFormReduxForm));
