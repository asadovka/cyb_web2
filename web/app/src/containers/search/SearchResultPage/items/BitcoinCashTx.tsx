import * as React from "react";
import { Link } from 'react-router';

import {
  Title, Number, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';

const BitcoinCashTx = (props) => {
  return (
  <div>
    <Row>
      <Title>Bitcoin Cash</Title>
      <Number>#{props.block_number}</Number>
      <Date value={props.block_time} format='YYYY-MM-DD hh:mm' />
    </Row>
    <Row>
      <Hash value={props.block_hash} />
      <Height>Fee:&nbsp;{props.fee}</Height>
    </Row>
    <Row>
      <Total>Total outputs value:&nbsp;{props.total_output}</Total>
    </Row>
    <Row>
      <DetailsLink to={`/bitcoin_cash/tx/${props.hash}`}>
        {`seacrh.cyber.fund/bitcoin_cash/tx/${props.hash}`}
      </DetailsLink>
    </Row>
  </div>
  );
}

export default BitcoinCashTx;

