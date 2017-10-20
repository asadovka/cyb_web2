import * as React from "react";
import {Field} from "redux-form";
var ReactGA = require("react-ga");

export function SearchFormComponent(props) {
  const {handleSubmit, submitting, dirty, router, search, location} = props;

  return (
    <form className="container" onSubmit={handleSubmit(values => {
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
    })}>
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
