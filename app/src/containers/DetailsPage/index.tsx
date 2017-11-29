import * as React from "react";

import Footer from '../app/Footer';
import SearchForm from '../app/SearchForm';
import {TopMenu} from "../../components/TopMenu";
import App from '../app/';

export const DetailsPage = ({ children }) => (
  <App>
    <SearchForm/>
    <div>
    {children}
    </div>
  </App>
);

