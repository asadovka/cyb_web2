import * as React from "react";
import withRouter from "react-router/es/withRouter";


const Tabs = () => (
  <div className="tabs">
    <ul>
      <li className="is-active"><a>All</a></li>
      <li><a>Bitcoin</a></li>
      <li><a>Ethereum</a></li>
    </ul>
  </div>
)

export default Tabs;
