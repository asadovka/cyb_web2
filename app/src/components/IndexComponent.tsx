import * as React from "react";
import {Link} from "react-router";
import {Logo} from "./logo/Logo";
import {PageContainer} from "./PageContainer";
import {FooterComponent} from "./FooterComponent";
import {TopMenu} from "./TopMenu";
import {SearchFormComponent} from "./SearchFormComponent";

export function IndexComponent() {
  return (
    <PageContainer>

      <div className="hero is-fullheight">
        <div className="hero-head">
          <TopMenu/>
        </div>

        <div className="hero-body">
          <div className="container">
            <SearchFormComponent/>
          </div>
        </div>

        <div className="hero-footer">

          <FooterComponent/>
        </div>
      </div>

    </PageContainer>
  );
}
