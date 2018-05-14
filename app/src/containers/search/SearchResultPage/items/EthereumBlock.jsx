import * as React from "react";
import { Link } from 'react-router';

import {
  Item, colors, ItemTitle, ItemContainer, ItemContainerRow, Label,
  Value, dateFormat,
  LinkHash
} from '../../../../components/SearchItems/';



const EthereumBlock = ({ number, hash, tx_number, timestamp }) => {
 return (
    <Item line={colors.block}>
      <ItemTitle bg={colors.ethereum}>Ethereum block #{number}</ItemTitle>
      <ItemContainer>
        <ItemContainerRow center width='33%' border='right'>
          <Label>Mined on:</Label>
          <Value>{dateFormat(timestamp)}</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/ethereum/block/${number}`} />
        </ItemContainerRow>
        <ItemContainerRow center width='33%'>
          <Label>Transaction:</Label>
          <Value>{tx_number}</Value>
        </ItemContainerRow>
      </ItemContainer>
    </Item>
 );
}

export default EthereumBlock;
