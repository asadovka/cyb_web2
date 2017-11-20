import * as React from "react";
import {Link} from "react-router";
import {Logo} from "../../components/logo/Logo";
import {PageContainer} from "../../components/PageContainer";
import {FooterComponent} from "../../components/FooterComponent/";
import {TopMenu} from "../../components/TopMenu";
import {SearchForm} from "../SearchForm";
import {Data} from "../../data/Data";
import Layout from '../../components/layout/'

export function IndexPage() {
  return (
     <Layout
       head={<TopMenu/>}
       body={<SearchForm/>}
       footer={<FooterComponent links={Data.links}/>}
     />
  );
}
