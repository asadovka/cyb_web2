import * as React from "react";

import Layout from '../../components/layout/'
import Footer from '../app/Footer';
import SearchForm from '../app/SearchForm';
import {TopMenu} from "../../components/TopMenu";
import Title from "../../components/title/";
import App from '../app/';

export const DetailsPage = ({ children }) => (
  <App>
    <SearchForm/>
    <div>
    {children}
    </div>
  </App>
);

