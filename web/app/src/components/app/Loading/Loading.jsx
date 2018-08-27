import * as React from "react";

require('./Loading.scss');

const Loading = (props) => (
  <div>
      <div className="loader-wrapper">
        <div className="loader">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div className="loader loader-2">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
        <div className="loader loader-3">
          <div className="roller"></div>
          <div className="roller"></div>
        </div>
      </div>
  </div>
);

export default Loading;