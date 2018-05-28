import * as React from "react";

import App from '../app/';
     
import { Indicator, Title } from '../../components/ApiIndicator/';

import { checkApi } from '../../modules/cybernode';
import { connect } from 'react-redux';
var config = require('./config.js')
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';

import Container from '../../components/Container/';


class Cybernode extends React.Component {
  componentDidMount() {
    this.props.checkApi();
  }
  render() {
    const {
      chaingearApiAvailable,
      searchApiAvailable,
      marketApiAvailable,
      marketStreamApiAvailable
    } = this.props;

    return (
      <Container>
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>CYBER_CHAINGEAR_API</TableCell>
              <TableCell>{config.CYBER_CHAINGEAR_API}</TableCell>
              <TableCell>
                <Indicator available={chaingearApiAvailable}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CYBER_SEARCH_API</TableCell>
              <TableCell>{config.CYBER_SEARCH_API}</TableCell>
              <TableCell><Indicator available={searchApiAvailable}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CYBER_MARKETS_API</TableCell>
              <TableCell>{config.CYBER_MARKETS_API}</TableCell>
              <TableCell><Indicator available={marketApiAvailable} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CYBER_MARKETS_STREAM_API</TableCell>
              <TableCell>{config.CYBER_MARKETS_STREAM_API}</TableCell>
              <TableCell><Indicator available={marketStreamApiAvailable} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      </Container>
    );    
  }
}

export default connect(
  state => ({
    chaingearApiAvailable: state.cybernode.chaingearApiAvailable,
    searchApiAvailable: state.cybernode.searchApiAvailable,
    marketApiAvailable: state.cybernode.marketApiAvailable,
    marketStreamApiAvailable: state.cybernode.marketStreamApiAvailable
  }),
  { checkApi }
)(Cybernode);
