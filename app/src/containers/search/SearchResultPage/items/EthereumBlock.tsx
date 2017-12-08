import * as React from "react";
import { Link } from 'react-router';

import {
  Title, Number, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';




const EthereumBlock = (data) => {
 return (
  <div>
    <Row>
      <Title>Ethereum</Title>
      <Number>#{data.tx_number}</Number>
      <Date value={data.timestamp} format='YYYY-MM-DD hh:mm' />
    </Row>
    <Row>
      <Hash value={data.hash} />
      <Height>Size:&nbsp;{data.size}</Height>
    </Row>
    <Row>
      <DetailsLink to={`/ethereum/block/${data.number}`}>
        {`seacrh.cyber.fund/ethereum/block/${data.number}`}
      </DetailsLink>
    </Row>
  </div>
 );
}

export default EthereumBlock;
