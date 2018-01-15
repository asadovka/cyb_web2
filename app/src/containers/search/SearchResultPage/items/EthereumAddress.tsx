import * as React from "react";
import { Link } from 'react-router';

import {
  Title, Number, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';

const BitcoinTx = (props) => {
  return (
  <div>
    <Row>
      <Title>Ethereum address</Title>
    </Row>
    <Row>
      <DetailsLink to={`/ethereum/address/${props.hash}`}>
        {`seacrh.cyber.fund/ethereum/address/${props.hash}`}
      </DetailsLink>
    </Row>
  </div>
  );
}

export default BitcoinTx;

