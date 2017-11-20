import * as React from "react";

const Title = ({ title, children }) => (
  <div className="tile is-ancestor is-vertical">
    <div className="tile is-child box">
      <h1 className="title">{title}</h1>
      {children}
    </div>
  </div>
)

export default Title;
