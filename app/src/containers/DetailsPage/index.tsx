import * as React from "react";

import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';

export const DetailsPage = ({ children }) => (
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
);

