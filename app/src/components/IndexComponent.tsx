import * as React from "react";
import {Link} from "react-router";
import {Logo} from "./logo/Logo";
import {PageContainer} from "./PageContainer";
import {FooterComponent} from "./FooterComponent";
import {TopMenu} from "./TopMenu";
import {SearchForm} from "../containers/SearchForm";
import {Data} from "../data/Data";

export function IndexComponent() {
  return (
    <PageContainer>

      <div className="hero is-fullheight">
        <div className="hero-head">
          <TopMenu/>
        </div>

        <div className="hero-body">
          <div className="container">
            <SearchForm/>
          </div>
        </div>

        <div className="hero-footer">
          <FooterComponent links={Data.links}/>
        </div>
      </div>

    </PageContainer>
  );
}
