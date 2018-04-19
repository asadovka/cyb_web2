import * as React from "react";
import { Link } from 'react-router';

import {
  Item, colors, ItemTitle, ItemContainer, ItemContainerRow, Label,
  Value, dateFormat, Hash, 
  Height, Total, DetailsLink, LinkHash
} from '../../../../components/SearchItems/';

const EthereumAddress = ({ hash, timestamp, value }) => {
  return (
  <Item line={colors.contract}>
    <ItemTitle bg={colors.ethereum}>Ethereum contract</ItemTitle>
      <ItemContainer>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/ethereum/address/${hash}`} />
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Value:</Label>
          <Value>{value} ETH</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%'>
          <Label>Created:</Label>
          <Value>{dateFormat(timestamp)}</Value>
        </ItemContainerRow>
      </ItemContainer>
  </Item>
  );
}

export default EthereumAddress;

