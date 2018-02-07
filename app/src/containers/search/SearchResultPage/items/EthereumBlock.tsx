import * as React from "react";
import { Link } from 'react-router';

import {
  Item,
  Title, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';




const EthereumBlock = (data) => {
 return (
  <Item color='#438cef'>
    <Row>
      <Title 
        color='#438cef'
        system='Ethereum'
        number={data.tx_number}
      />  
    </Row>
    <Row>
      <Date value={data.timestamp} format='YYYY-MM-DD hh:mm' label='Mined on:'/>
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
  </Item>
 );
}

export default EthereumBlock;
