import * as React from "react";
import { Link } from 'react-router';

import {
  Item, colors, ItemTitle, ItemContainer, ItemContainerRow, Label,
  Value, dateFormat, Hash, 
  Height, Total, DetailsLink, LinkHash
} from '../../../../components/SearchItems/';



const EthereumAddress = ({ hash, first_activity_date, confirmed_balance }) => {
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
          <Value>{confirmed_balance} ETH</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%'>
          <Label>Created:</Label>
          <Value>{dateFormat(first_activity_date)}</Value>
        </ItemContainerRow>
      </ItemContainer>
  </Item>
  );
}

export default EthereumAddress;

