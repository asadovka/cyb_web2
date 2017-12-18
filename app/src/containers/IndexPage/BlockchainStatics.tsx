import * as React from "react";

import {
  Container, Item, Title, Table, DataContainer, Value,
  Label, List,
  Delta
} from '../../components/BlockchainStatics/';

import { connect } from 'react-redux';
var numeral = require('numeral');

import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';


// const BlockchainStatics = ({ total_24h_volume_usd, total_24h_volume_bit }) => (
//   <Container>
//     <Item comingSoon={true}>
//       <Title icon='cap'>Cybernomics cap</Title>
//       <DataContainer>
//         <List>
//           <li><Value>{numeral(total_24h_volume_usd).format('$0,0,0.00')}</Value></li>
//           <li><Delta value={1.7} /></li>
//           <li><Value>{numeral(total_24h_volume_bit).format('0,0,0.00')}</Value></li>
//           <li><Delta value={-2.78} /></li>
//           <li><Label>24h changes</Label></li>
//         </List>
//       </DataContainer>
//     </Item>
//     <Item comingSoon={true}>
//       <Title icon='search'>Search Statistics</Title>
//       <div>
//         <Table>
//           <tbody>
//             <tr>
//               <td>Blocks Indexed:</td>
//               <td>2</td>
//             </tr>
//             <tr>
//               <td>Blocks Indexed:</td>
//               <td>80M</td>
//             </tr>
//             <tr>
//               <td>Transactions Indexed:</td>
//               <td>900M</td>
//             </tr>
//             <tr>
//               <td>Database Size:</td>
//               <td>1TB</td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//     </Item>
//     <Item comingSoon={true}>
//       <Title icon='portfolio'>Portfolio</Title>
//       <div>
//         <Table>
//           <tbody>
//             <tr>
//               <td>Tokens:</td>
//               <td>24</td>
//             </tr>
//             <tr>
//               <td>Value:</td>
//               <td>50BTC/200000$</td>
//             </tr>
//             <tr>
//               <td>Perfonance (24):</td>
//               <td>+24%</td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//     </Item>
//   </Container>
// );

// <CentredContainer>  
//     <div className='container'>
//       <Title icon='cap'>Cybernomics cap</Title>
//       <Title icon='search'>Search Statistics</Title>
//       <Title icon='portfolio'>Portfolio</Title>
//     </div>
//     </CentredContainer>

// import CentredContainer from '../../components/CentredContainer/';


const BlockchainStatics = () => {
  return (
      <div className='columns' style={{ marginTop: 100 }}>
        <div className='column'>
            <Card style={{ minHeight: 200 }}>
              <CardContent>
                Cybernomics cap
              </CardContent>
            </Card>
        </div>
        <div className='column'>
            <Card style={{ minHeight: 200 }}>
              <CardContent>
                Search Statistics
              </CardContent>
            </Card>
        </div>
        <div className='column'>
            <Card style={{ minHeight: 200 }}>
              <CardContent>
                Portfolio
              </CardContent>
            </Card>
        </div>
    </div>
  );
}

export default connect(
  state => {
    return ({
      total_24h_volume_usd: '????',
      total_24h_volume_bit: '????'
    })
  }
)(BlockchainStatics);
