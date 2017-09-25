import * as React from "react";

export function SearchFormComponent() {
  return (
    <div className="field has-addons has-addons-centered">
      <div className="control">
        <input className="input is-medium" type="text" placeholder="Find a block"/>
      </div>
      <div className="control">
        <a className="button is-info is-medium">
          Search
        </a>
      </div>
    </div>
  );
}
