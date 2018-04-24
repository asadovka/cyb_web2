import React, { Component } from 'react';


import { Title, Badge } from '../../../components/Title/'
import { Paper } from '../../../components/Paper/';
import { Container, Text, Link } from '../../../components/CallToAction/';
import { Table } from '../../../components/cTable/';

import { Link as RouterLink } from 'react-router';

import { chaingear } from 'cyber-search-js';

export class Allregister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      registries: []
    }
  }

  componentDidMount() {
    chaingear.getRegistry().then(registries => {
      this.setState({ registries })
    })
  }
  render() {
    const { registries } = this.state;
    const rows = registries.map((item, index) => {
      return (
        <tr key={index}>
          <td><RouterLink to={`/registers/${item.address}`}>{item.name}</RouterLink></td>
          <td>{item.address}</td>
          <td>1 ETH</td>
          <td>10 ETH</td>
          <td>32</td>
          <td>Oct 09 15:47</td>
          <td>Oct 09 15:47</td>
        </tr>
      );
    })
    return (
      <div>
        <Title>My registers<Badge>{registries.length}</Badge></Title>
        <Paper>
          <Container>
              <Text>You haven`t created registers yet!</Text>
              <Link to='/registers/new'>create</Link>
          </Container>
        </Paper>

        <Title>All registers<Badge>{registries.length}</Badge></Title>
        <Paper>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Current Valuation</th>
                <th>Total Valuations</th>
                <th>Entries</th>
                <th>Created</th>
                <th>Last update</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </Paper>
      </div>
    );
  }
}


export default Allregister;

