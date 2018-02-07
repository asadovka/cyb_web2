import * as React from "react";
import { Link } from 'react-router';

import {
  Item,
  Title, Date, Row, Hash,
  Height, Total, DetailsLink
} from '../../../../components/SearchItems/';


const EthereumTx = (data) => {
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
        <Height>Fee:&nbsp;{data.fee}</Height>
      </Row>
      <Row>
        <Total>Total outputs value:&nbsp;{data.value}</Total>
      </Row>
      <Row>
        <DetailsLink to={`/ethereum/tx/${data.hash}`}>
           {`seacrh.cyber.fund/ethereum/tx/${data.hash}`}
        </DetailsLink>
      </Row>
    </Item>
  );
}

export default EthereumTx;
