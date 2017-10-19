import * as React from "react";
import {Field} from "redux-form";

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
      }
    })}>
      <div className="field has-addons has-addons-centered">
        <div className="control" style={{width:800}}>
          <Field
            name="query"
            className="input is-medium"
            component="input"
            type="text"
            placeholder="Find a block"
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
