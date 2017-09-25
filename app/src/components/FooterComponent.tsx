import * as React from "react";

export function FooterComponent() {
  return (
    <footer className="footer" style={{backgroundColor:"white"}}>
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <a href="http://cyber.fund/">Home</a>
            {" - "}
            <a href="https://github.com/cyberFund/cyber-ui">Github</a>
            {" - "}
            <a href="http://company.cyber.fund/">About us</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
