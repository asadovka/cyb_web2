import * as React from "react";
import {Link} from "react-router";
import {Data} from "../data/Data";
import {FooterComponent} from "./FooterComponent";
import {SearchForm} from "../containers/SearchForm";
import {TopMenu} from "./TopMenu";
import {PageContainer} from "./PageContainer";

const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function BlockComponent() {
  return (
    <PageContainer>

      <div className="hero is-fullheight">
        <div className="hero-head">
          <TopMenu/>
          <SearchForm/>
        </div>

        <div className="hero-body">
          <div className="container">
            <div className="tile is-ancestor is-vertical">
              <div className="tile is-child box">
                <h1 className="title">Block Title</h1>
                <p>
                  Block description
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-footer">
          <FooterComponent links={Data.links}/>
        </div>
      </div>

    </PageContainer>
  );
}
