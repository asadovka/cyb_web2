import * as React from "react";
import { Link } from 'react-router';

import {
  Title, Number, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';

const EthereumClassicTx = (data) => {
  return (
    <div>
      <Row>
        <Title>Ethereum Classic</Title>
        <Number>#{data.block_number}</Number>
        <Date value={data.timestamp} format='YYYY-MM-DD hh:mm' />
      </Row>
      <Row>
        <Hash value={data.hash} />
        <Height>Fee:&nbsp;{data.fee}</Height>
      </Row>
      <Row>
        <Total>Total outputs value:&nbsp;{data.value}</Total>
      </Row>
      <Row>
        <DetailsLink to={`/ethereum_classic/tx/${data.hash}`}>
           {`seacrh.cyber.fund/ethereum_classic/tx/${data.hash}`}
        </DetailsLink>
      </Row>
    </div>
  );
}

export default EthereumClassicTx;
