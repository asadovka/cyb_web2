
import * as React from "react";
import { Link } from 'react-router';

import {
  Title, Number, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';


const BitcoinBlock = (props) => (
  <div>
    <Row>
      <Title>Bitcoin</Title>
      <Number>#{props.tx_number}</Number>
      <Date value={props.time} format='YYYY-MM-DD hh:mm' />
    </Row>
    <Row>
      <Hash value={props.hash} />
      <Height>Height:&nbsp;{props.height}</Height>
    </Row>
    <Row>
      <Total>Total outputs value:&nbsp;{props.total_outputs_value}</Total>
    </Row>
    <Row>
      <DetailsLink to={`/bitcoin/block/${props.height}`}>
        {`seacrh.cyber.fund/bitcoin/block/${props.height}`}
      </DetailsLink>
    </Row>
  </div>
);

export default BitcoinBlock;
