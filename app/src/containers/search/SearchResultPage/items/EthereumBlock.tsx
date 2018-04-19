import * as React from "react";
import { Link } from 'react-router';

import {
  Item, colors, ItemTitle, ItemContainer, ItemContainerRow, Label,
  Value, dateFormat,
  Title, Date, Row, Hash,
  Height, Total, DetailsLink, LinkHash
} from '../../../../components/SearchItems/';


  {/*<Item color='#438cef'>
    <Row>
      <Title 
        color='#438cef'
        system='Ethereum'
        number={data.number}
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
  </Item>*/}

const EthereumBlock = ({ number, hash, txNumber, timestamp }) => {
 return (
    <Item line={colors.block}>
      <ItemTitle bg={colors.ethereum}>Ethereum block #{number}</ItemTitle>
      <ItemContainer>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/ethereum/block/${number}`} />
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Transaction:</Label>
          <Value>{txNumber}</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%'>
          <Label>Mined on:</Label>
          <Value>{dateFormat(timestamp)}</Value>
        </ItemContainerRow>
      </ItemContainer>
    </Item>
 );
}

export default EthereumBlock;
