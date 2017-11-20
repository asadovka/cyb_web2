import * as React from 'react';
import {PageContainer} from "../PageContainer";

const Layout = ({ head, body, footer }) => (
  <PageContainer>
    <div className="hero is-fullheight">
      <div className="hero-head">
        {head}
      </div>

      <div className="hero-body">
        <div className="container">
          {body}
        </div>
      </div>

      <div className="hero-footer">
        {footer}
      </div>
    </div>
  </PageContainer>
);

export default Layout;

