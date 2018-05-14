import * as React from "react";
import { Link } from 'react-router';

import {
  Item, colors, ItemTitle, ItemContainer, ItemContainerRow, Label,
  Value, dateFormat,
  Title, Date, Row, Hash,
  Height, Total, DetailsLink, LinkHash
} from '../../../../components/SearchItems/';


// <Item color='#438cef'>
//       <Row>
//         <Title 
//         color='#438cef'
//         system='Ethereum'
//         number={data.tx_number}
//        />         
//       </Row>
//       <Row>
//         <Date value={data.timestamp} format='YYYY-MM-DD hh:mm' label='Mined on:'/>
//       </Row>
//       <Row>
//         <Hash value={data.hash} />
//         <Height>Fee:&nbsp;{data.fee}</Height>
//       </Row>
//       <Row>
//         <Total>Value:&nbsp;{data.value}</Total>
//       </Row>
//       <Row>
//         <DetailsLink to={`/ethereum/tx/${data.hash}`}>
//            {`seacrh.cyber.fund/ethereum/tx/${data.hash}`}
//         </DetailsLink>
//       </Row>
//     </Item>

const EthereumUncle = ({ block_number, timestamp, hash }) => {
  return (
     <Item line={colors.uncle}>
      <ItemTitle bg={colors.ethereum_classic}>Ethereum Uncle block #{block_number}</ItemTitle>
      <ItemContainer>
        <ItemContainerRow center width='33%' border='right'>
          <Label>Mined on:</Label>
          <Value>{dateFormat(timestamp)}</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/ethereum_classic/uncle/${hash}`} />
        </ItemContainerRow>
        <ItemContainerRow center>
          <Label>Uncle position:</Label>
          <Value>0</Value>
        </ItemContainerRow>
      </ItemContainer>
    </Item>  
  );
}

export default EthereumUncle;
