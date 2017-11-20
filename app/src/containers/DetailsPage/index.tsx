import * as React from "react";

import Layout from '../../components/layout/'
import {Data} from "../../data/Data";
import {FooterComponent} from "../../components/FooterComponent/";
import {SearchForm} from "../../containers/SearchForm";
import {TopMenu} from "../../components/TopMenu";
import Title from "../../components/title/";

export const DetailsPage = ({ children }) => (
  <Layout
    head={(
      <div>
        <TopMenu/>
        <SearchForm/>
      </div>
    )}
    body={children}
    footer={<FooterComponent links={Data.links}/>}
  />
);

