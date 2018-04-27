import * as React from "react";
import { Link } from 'react-router';

import {
  Item, colors, ItemTitle, ItemContainer, ItemContainerRow, Label,
  Value, dateFormat,
  Title, Date, Row, Hash,
  Height, Total, DetailsLink, LinkHash
} from '../../../../components/SearchItems/';


const EthereumBlock = ({ number, hash, tx_number, timestamp }) => {
 return (
    <Item line={colors.block}>
      <ItemTitle bg={colors.ethereum_classic}>Ethereum Classic block #{number}</ItemTitle>
      <ItemContainer>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/ethereum_classic/block/${number}`} />
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Transaction:</Label>
          <Value>{tx_number}</Value>
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
