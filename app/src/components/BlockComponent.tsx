import * as React from "react";
import JSONViewer from "react-json-view";
import {Data} from "../data/Data";
import {FooterComponent} from "./FooterComponent";
import {SearchForm} from "../containers/SearchForm";
import {TopMenu} from "./TopMenu";
import {PageContainer} from "./PageContainer";

export function BlockComponent({title, data, blockView} : {title: string, data: any, blockView: any}) {
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
                <h1 className="title">{title}</h1>
                {blockView(data)}
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
