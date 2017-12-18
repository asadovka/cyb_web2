import * as React from "react";

import Footer from '../app/Footer';
import SearchForm from '../app/SearchForm';
import {TopMenu} from "../../components/TopMenu";
import App from '../app/';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';

export const DetailsPage = ({ children }) => (
  <div>
    {/*<SearchForm/>*/}
    <Paper>
    <Card>
    <CardContent>
    {children}
    </CardContent>
    </Card>
    </Paper>
  </div>
);

