import * as React from "react";

import {
  Container, Item, Title, Table, DataContainer, Value,
  Label, List,
  Delta
} from '../../components/BlockchainStatics/';

const BlockchainStatics = () => (
  <Container>
    <Item>
      <Title icon='cap'>Cybernomics cap</Title>
      <DataContainer>
        <List>
          <li><Value>$168,804,051,901</Value></li>
          <li><Delta value={1.7} /></li>
          <li><Value>35,322,488</Value></li>
          <li><Delta value={-2.78} /></li>
          <li><Label>24h changes</Label></li>
        </List>
      </DataContainer>
    </Item>
    <Item>
      <Title icon='search'>Search Statistics</Title>
      <div>
        <Table>
          <tbody>
            <tr>
              <td>Blocks Indexed:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Blocks Indexed:</td>
              <td>80M</td>
            </tr>
            <tr>
              <td>Transactions Indexed:</td>
              <td>900M</td>
            </tr>
            <tr>
              <td>Database Size:</td>
              <td>1TB</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Item>
    <Item>
      <Title icon='portfolio'>Portfolio</Title>
      <div>
        <Table>
          <tbody>
            <tr>
              <td>Tokens:</td>
              <td>24</td>
            </tr>
            <tr>
              <td>Value:</td>
              <td>50BTC/200000$</td>
            </tr>
            <tr>
              <td>Perfonance (24):</td>
              <td>+24%</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Item>
  </Container>
);

export default BlockchainStatics;
