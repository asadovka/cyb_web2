import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import withRouter from "react-router/es/withRouter";

import * as React from "react";
import {Field} from "redux-form";
var ReactGA = require("react-ga");

import { SearchField, Button, Container } from '../../components/SearchForm/';

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
    <form  onSubmit={handleSubmit(submit)}>
      <Container>
          <SearchField
            name="query"
            component="input"
            type="text"
            placeholder="Blockchains grow here"
          />
          <Button disabled={submitting} >
            Search
          </Button>
      </Container>
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
