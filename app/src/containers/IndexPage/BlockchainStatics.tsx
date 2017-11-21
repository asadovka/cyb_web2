import * as React from "react";

import { Container, Item } from '../../components/BlockchainStatics/';

const BlockchainStatics = () => (
  <Container>
    <Item>
      <h3>Cybernomics cap</h3>
      <p>$168,804,051,901</p>
      <p>+1.7%</p>
      <p>35,322,488</p>
      <p>-2.78%</p>
      <p>24h changes</p>
    </Item>
    <Item>
      <h3>Search Statistics</h3>
      <p>Blocks Indexed:         80M</p>
      <p>Transactions Indexed:  900M</p>
      <p>Database Size:          1TB</p>
    </Item>
    <Item>
      <h3>Portfolio</h3>
      <p>Tokens:     24</p>
      <p>Value:      50BTC/200000 $</p>
      <p>Perfonance </p>
      <p>(24):       +24%</p>
    </Item>
  </Container>
);

export default BlockchainStatics;
